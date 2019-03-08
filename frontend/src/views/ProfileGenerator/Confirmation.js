import React, { Component } from 'react';
import Base64 from 'base-64';
import { Card, CardBody, CardHeader, Progress, Row, Col, Button,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader
     } from 'reactstrap';

class Confirmation extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
            saving: false,
            generatingBP: false,
            generatingLayout: false,
            registering: false,
            saved: false,
            bundleName: '',
            bundleDescription: '',
            missingForm: false
        }
    }

    findAndReplace(string, target, replacement) {
 
        var i = 0, length = string.length;
        
        for (i; i < length; i++) {
        
          string = string.replace(target, replacement);
        
        }
        
        return string;
        
       }

    layoutIcon (){
        if(this.state.generatingBP) {
            return ''
        } else {
             if(this.state.generatingLayout){
               return 'fa fa-spinner fa-spin'
             } else {
                 return 'fa fa-check'
             }
        }
    }

    componentIcon (){
        if(this.state.generatingBP || this.state.generatingLayout) {
            return ''
        } else {
             if(this.state.registering){
               return 'fa fa-spinner fa-spin'
             } else {
                 return 'fa fa-check'
             }
        }
    }
    

    handleNameChange = (e) => {
        this.setState({ bundleName: e.target.value });
      }

      handleDescriptionChange = (e) => {
        this.setState({ bundleDescription: e.target.value });
      }
    generateData = async event => {
        if(this.state.bundleName.toString() === '' || this.state.bundleDescription.toString() === '' ){
            this.setState({ missingForm: !this.state.missingForm });
        } else {
        this.setState({saving: true,
                       generatingBP: true});
        const {values: { clusterType, clusterVersion, clusterId, services, recipes, dataPlaneApplications }} = this.props;
        
        
        // 1. Generating Blueprint

        // 1.1. Configuration
        var blueprint = '{"configurations": [';
        
        for(var key in services){
            
            var getConfig = await fetch('http://localhost:4000/api/generator/getserviceconfig/' + services[key].id)
            var config = await getConfig.json()
           
            if(!(config.toString() === "")){
                for(var component in config) {
                    blueprint = blueprint + config[component].config + ','
                }
            }
        }

        blueprint = blueprint.substring(0,blueprint.length-1);
        blueprint = blueprint + '], "host_groups": ['

        // 1.2. Master
        blueprint = blueprint + ' {"name": "master", "cardinality": "1","components": [';

        for(var key in services){
            
            var getConfig = await fetch('http://localhost:4000/api/generator/mastercomponents/' + services[key].id)
            var config = await getConfig.json()
           
            if(!(config.toString() === "")){
                for(var component in config) {
                    blueprint = blueprint + config[component].master_blueprint + ','
                }
            }
        }

        blueprint = blueprint.substring(0,blueprint.length-1);
        blueprint = blueprint + ']},'

        
        // 1.3. Worker
        blueprint = blueprint + ' {"name": "worker", "cardinality": "1+","components": [';

        for(var key in services){
            
            var getConfig = await fetch('http://localhost:4000/api/generator/workercomponents/' + services[key].id)
            var config = await getConfig.json()
           
            if(!(config.toString() === "")){
                for(var component in config) {
                    blueprint = blueprint + config[component].worker_blueprint + ','
                }
            }
        }

        blueprint = blueprint.substring(0,blueprint.length-1);
        blueprint = blueprint + ']},'

        // 1.4. Compute
        blueprint = blueprint + ' {"name": "compute", "cardinality": "1+","components": [';

        for(var key in services){
            
            var getConfig = await fetch('http://localhost:4000/api/generator/computecomponents/' + services[key].id)
            var config = await getConfig.json()
           
            if(!(config.toString() === "")){
                for(var component in config) {
                    blueprint = blueprint + config[component].compute_blueprint + ','
                }
            }
        }
        
        blueprint = blueprint.substring(0,blueprint.length-1);
        blueprint = blueprint + ']}'

        var cdswPresent = false;
        // 1.5. If CDSW, we generate a CDSW node
        dataPlaneApplications.map((application, index, arr) => {
            if  (application.name === 'CDSW') {
                cdswPresent = true;
            }
        }
        )
        if(cdswPresent) {
            blueprint = blueprint + ',{'+
                '"name": "cdsw",'+
                '"configurations": [],'+
                '"components": ['+
                '  {'+
                '    "name": "SPARK2_CLIENT"'+
                '  },'+
                '  {'+
                '    "name": "ZOOKEEPER_CLIENT"'+
                '  },'+
                '  {'+
                '    "name": "YARN_CLIENT"'+
                '  },'+
                '  {'+
                '    "name": "HDFS_CLIENT"'+
                '   },'+
                '   {'+
                '    "name": "MAPREDUCE2_CLIENT"'+
                '   },'+
                '   {'+
                '     "name": "HIVE_CLIENT"'+
                '   }'+
                ' ],'+
                ' "cardinality": "1" '+
                '  }],'
        } else {
            blueprint = blueprint + '],'
        }
        

        // 1.6. Name
        var stack_name ='';
        var stack_version = '';
        
        if(clusterType.toString() === 'HDF') {
            stack_name='HDF'
            stack_version='3.3'
        } else {
            stack_name='HDP'
            stack_version='3.1'
        }
        

        var normalizedBundleName = "bp-"+this.findAndReplace(this.state.bundleName.toString().toLowerCase(), " ", "-")+".json"

         blueprint = blueprint + '"Blueprints": {"blueprint_name": "'+ normalizedBundleName +'",'
         blueprint = blueprint + '"stack_name": "'+ stack_name +'",'
         blueprint = blueprint + '"stack_version": "'+ stack_version +'"}}'

        

          this.setState({ generatingBP: false,
                          generatingLayout: true });


         // 2. Generating Layout 
         // NOTE: WILL HAVE TO CHANGE ONCE WE SUPPORT MORE THAN ONE VERSION
         var cluster_id;
         if(clusterType.toString() === 'HDP') {
            cluster_id=1
        } else if(clusterType.toString() === 'HDF'){
            cluster_id=2
        }else {
            cluster_id=3
        }

        
        // 2.1. General Info
         var layout = '{ "desc": "' + this.state.bundleDescription + '", ';
         layout = layout + '"deploywait": "' + 1800 + '", ';
         layout = layout + '"purge": "' + true + '", ';
         layout = layout + '"priority": "", ';
         layout = layout + '"seq:": { ';
         layout = layout + '"prep_deps": ["' + normalizedBundleName + '"], ';
         layout = layout + '"prep_spec": ["' + normalizedBundleName + '"], ';
         layout = layout + '"do_builds": ["' + normalizedBundleName + '"] ';
         layout = layout + '}, ';

         // 2.2. Stack Info
         layout = layout + '"infra": { "ambariRepo": { ';
         

         var retrieveClusterInfo = await fetch('http://localhost:4000/api/clusters/'+cluster_id)
        var clusterInfo = await retrieveClusterInfo.json()


        layout = layout + '"version": "' + clusterInfo.ambari_repo_version + '",';
        layout = layout + '"baseUrl": "' + clusterInfo.ambari_base_url + '",';
        layout = layout + '"gpgKeyUrl": "' + clusterInfo.ambari_gpg_key_url + '"}, "stackRepo": {';
        layout = layout + '"version": "' + clusterInfo.repo_version + '",';
        layout = layout + '"baseUrl": "' + clusterInfo.repo_def_file_url + '"}},';

        // 2.3. Blueprint Info
         layout = layout + '"blueprint": { "name": "' + normalizedBundleName + '"}, ';
        
         // 2.4. Recipe Info
         layout = layout + '"recipe": [ ';

         for(var key in recipes){
            var prefix= '';
            var typeNormalized ='';
            if(recipes[key].type === 'Pre Ambari Start'){
                prefix = 'pras-';
                typeNormalized = 'PRE_AMBARI_START';
            } else if(recipes[key].type === 'Post Cluster Install'){
                prefix =  'poci-';
                typeNormalized = 'POST_CLUSTER_INSTALL';
            } else if(recipes[key].type === 'Post Ambari Start'){
                prefix =  'poas-';
                typeNormalized = 'POST_AMBARI_START';
            } else if(recipes[key].type === 'On Termination'){
                prefix =  'prte-'
                typeNormalized = 'PRE_TERMINATION';
            }

            layout = layout + '{ "name" : "' + prefix + this.findAndReplace(recipes[key].name.toString().toLowerCase(), " ", "-") + '.sh",';
            layout = layout + ' "typ" : "' +  typeNormalized  + '"},';

         }
         layout = layout.substring(0,layout.length-1);
         layout = layout + "],"

         
        // 2.5. Group Info
        layout = layout + '"group": [ ';
        
        // Creating the different recipe arrays

        var getNodes = await fetch('http://localhost:4000/api/recipes/nodes')
        var resNodes = await getNodes.json()

        var masterRecipes = '[';
        var computeRecipes = '[';
        var workerRecipes = '[';
        var cdswRecipes = '[';
        for(var key in recipes){
            for(var j in resNodes){
                if(resNodes[j].recipe_id.toString() === recipes[key].id.toString()) {
                   
                    var prefix = '';
                    if(recipes[key].type === 'Pre Ambari Start'){
                        prefix = 'pras-';
                    } else if(recipes[key].type === 'Post Cluster Install'){
                        prefix =  'poci-';
                    } else if(recipes[key].type === 'Post Ambari Start'){
                        prefix =  'poas-';
                    } else if(recipes[key].type === 'On Termination'){
                        prefix =  'prte-'
                    }

                    if(resNodes[j].node_type.toString() === "MASTER"){
                        masterRecipes = masterRecipes + '"' + prefix + this.findAndReplace(recipes[key].name.toString().toLowerCase(), " ", "-")  + '.sh",'
                    } else if(resNodes[j].node_type.toString() === "WORKER"){
                        workerRecipes = workerRecipes + '"' + prefix + this.findAndReplace(recipes[key].name.toString().toLowerCase(), " ", "-")  + '.sh",'
                    } else if(resNodes[j].node_type.toString() === "COMPUTE"){
                        computeRecipes = computeRecipes + '"' + prefix + this.findAndReplace(recipes[key].name.toString().toLowerCase(), " ", "-")  + '.sh",'
                    } else if(resNodes[j].node_type.toString() === "CDSW"){
                        cdswRecipes = cdswRecipes + '"' + prefix + this.findAndReplace(recipes[key].name.toString().toLowerCase(), " ", "-")  + '.sh",'
                    }

                }
            }

        }
        if(masterRecipes.length > 1) masterRecipes = masterRecipes.substring(0,masterRecipes.length-1);
        masterRecipes = masterRecipes + ']';

        if(workerRecipes.length > 1) workerRecipes = workerRecipes.substring(0,workerRecipes.length-1);
        workerRecipes = workerRecipes + ']';

        if(computeRecipes.length > 1) computeRecipes = computeRecipes.substring(0,computeRecipes.length-1);
        computeRecipes = computeRecipes + ']';

        if(cdswRecipes.length > 1) cdswRecipes = cdswRecipes.substring(0,cdswRecipes.length-1);
        cdswRecipes = cdswRecipes + ']';


        // 2.5.1. Master
        layout = layout + '{ "master" : {';
        layout = layout + '"recipe" : ' + masterRecipes + ',';
        layout = layout + '"type" : "GATEWAY",';
        layout = layout + '"machine" : "8x28-8x32"}},';
        


        // 2.5.2. Worker
        layout = layout + '{ "worker" : {';
        layout = layout + '"recipe" : ' + workerRecipes + ',';
        layout = layout + '"type" : "CORE",';
        layout = layout + '"machine" : "4x14-4x16"}},';

        // 2.5.3. Compute
        layout = layout + '{ "compute" : {';
        layout = layout + '"recipe" : ' + computeRecipes + ',';
        layout = layout + '"type" : "CORE",';
        layout = layout + '"machine" : "4x14-4x16"}},';

        // 2.5.4. Additional if any
        if(cdswPresent) {
            layout = layout + '{ "cdsw" : {';
            layout = layout + '"recipe" : ' + cdswRecipes + ',';
            layout = layout + '"type" : "CORE",';
            layout = layout + '"machine" : "16x60-16x66",';
            layout = layout + '"rootvol" : "100",';
            layout = layout + '"vols" : "12x500"}},';
        }
        layout = layout.substring(0,layout.length-1);
         layout = layout + "]}"


         this.setState({ generatingLayout: false,
                         registering: true });

         // 3. Registering components

         var insertBundle = await fetch('http://localhost:4000/api/generator/insert/bundle', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.bundleName,
                description: this.state.bundleDescription
            })
            })

         var bundleResponse = await insertBundle.json()

         var getNextBundeId= await fetch('http://localhost:4000/api/generator/maxid/')
         var bundleIdJson = await getNextBundeId.json()
         var bundleId = bundleIdJson.id
        
        

         // 3.1. Cluster
         


        var insertCluster = await fetch('http://localhost:4000/api/generator/insert/dependency', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                bundle_id: bundleId,
                                dep_type: 'CLUSTER',
                                dep_id: cluster_id
                            })
                            })
        var clusterResponse = await insertCluster.json()


         // 3.2. Services
         for(var key in services){
            
            var insertService = await fetch('http://localhost:4000/api/generator/insert/dependency', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bundle_id: bundleId,
                    dep_type: 'SERVICES',
                    dep_id: services[key].id
                })
                })
            var serviceResponse = await insertService.json()
           
        }

         // 3.3. Recipes
         for(var key in recipes){
            
            var insertRecipes = await fetch('http://localhost:4000/api/generator/insert/dependency', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bundle_id: bundleId,
                    dep_type: 'RECIPES',
                    dep_id: recipes[key].id
                })
                })
            var recipeResponse = await insertRecipes.json()
           
        }

         // 3.4. MPACK
         if(clusterId == 3) {

            var insertMPACK = await fetch('http://localhost:4000/api/generator/insert/dependency', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                bundle_id: bundleId,
                                dep_type: 'MPACK',
                                dep_id: 1
                            })
                            })
            var MPACKResponse = await insertMPACK.json()
         }

         // 3.5. Inserting contents

         // 3.5.1. Blueprint
         var insertCluster = await fetch('http://localhost:4000/api/generator/insert/content', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bundle_id: bundleId,
                type: 'BLUEPRINT',
                content: Base64.encode(JSON.stringify(JSON.parse(blueprint), undefined, 2))
            })
            })
var clusterResponse = await insertCluster.json()

         // 3.5.2. Layout (Nothing for now)
         var insertCluster = await fetch('http://localhost:4000/api/generator/insert/content', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bundle_id: bundleId,
                type: 'LAYOUT',
                content: Base64.encode(JSON.stringify(JSON.parse(layout), undefined, 2))
            })
            })

     


         this.setState({ registering: false,
            saved: true });
    }
    }


   
    saveAndContinue = (e) => {


        e.preventDefault();
        this.props.nextStep();
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){
        const {values: { clusterType, clusterVersion, clusterId, services, recipes, dataPlaneApplications }} = this.props;
        const serviceList = services.filter((service) => (service.id));
        const recipesList = recipes.filter((recipe) => recipe.id);
        //const applicationList = dataPlaneApplications.filter((application) => application.id);

        return(
            <div className="animated fadeIn align-items-center">
                <Row>
                    <Col>
                        <h1>Step 5: Save Bundle to Library</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    
                        &nbsp; 
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Progress animated value='100' color="dark" text-align="center" size="lg"></Progress>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        &nbsp; 
                    </Col>
                </Row>
                <Row>
                </Row>
                <Row>
                <Col>
                    <Card className='border-primary'>
                   
                    <Modal isOpen={this.state.missingForm} toggle={() => { this.setState({ missingForm: !this.state.missingForm }); }}
                       className={'modal-secondary ' + this.props.className}>
                
                  <ModalBody>
                  <h3>Please enter bundle Name and Description</h3>
                  </ModalBody>
                  <ModalFooter>
                  <Button color='secondary' onClick={() => { this.setState({ missingForm: !this.state.missingForm}); }}>OK <i className="fa fa-long-arrow-right"></i></Button>
                   </ModalFooter>
                </Modal>

                    <Modal isOpen={this.state.saving}
                       className={this.state.saved ? 'modal-success ' + this.props.className : 'modal-primary ' + this.props.className}>
                       <ModalHeader >{this.state.saved ? 'Bundle Generated!' : 'Generating bundle ... '} <i className={this.state.saved ? '':'fa fa-spinner fa-spin'}></i></ModalHeader>
                  
                  <ModalBody>
                   <h3>Blueprint ... <i className={this.state.generatingBP ? 'fa fa-spinner fa-spin' : 'fa fa-check'}></i> </h3>
                   <h3>Layout ... <i className={this.layoutIcon()}></i> </h3>
                   <h3>Registering bundle ... <i className={this.componentIcon()}></i> </h3>
                  </ModalBody>
                  <ModalFooter>
                  <Button color={this.state.saved ? 'success' : 'primary'} href="#/library" disabled={!this.state.saved}>Go to library <i className="fa fa-long-arrow-right"></i></Button>
                   </ModalFooter>
                </Modal>
                
                        <CardHeader className="text-white bg-primary">
                            <h2>Configuration Summary</h2>
                        </CardHeader>
                        <CardBody>
                            <table>
                                <tbody>
                                    <tr height="30px">
                                        <td width="30%">
                                            <strong>Cluster Type</strong>
                                        </td>
                                        <td width="70%">
                                            {clusterType}
                                        </td>
                                    </tr>
                                    <tr height="30px">
                                        <td width="30%">
                                            <strong>Cluster Version</strong>
                                        </td>
                                        <td width="70%">
                                            {clusterVersion}
                                        </td>
                                    </tr>
                                    <tr height="40px">
                                        <td width="30%">
                                            <strong>Services</strong>
                                        </td>
                                        <td width="70%">
                                        {serviceList.map((service, index, arr) => {
                                            return index == arr.length - 1 ? service.name : service.name + ", "
                                        })}
                                        </td>
                                    </tr>
                                    <tr height="40px">
                                        <td width="30%">
                                            <strong>Add-Ons</strong>
                                        </td>
                                        <td width="70%">
                                        {recipesList.map((recipe, index, arr) => {
                                            return index == arr.length - 1 ? recipe.name + " ("+recipe.addon_type+")" : recipe.name + " ("+recipe.addon_type+"), "
                                            }
                                        )}
                                        </td>
                                    </tr>
                                    <tr height="35px">
                                        <td width="30%">
                                            <strong>Additional Apps</strong>
                                        </td>
                                        <td width="70%">
                                        {dataPlaneApplications.map((application, index, arr) => {
                                            return index == arr.length - 1 ? application.name : application.name + ", "
                                        }
                                        )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </CardBody>
                    </Card>
                </Col>
                <Col>
                <Card className="border-success">
                        <CardHeader className="text-white bg-success">
                            <h2>Details</h2>
                        </CardHeader>
                        <CardBody>
                        <Form>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-folder"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="bundleName" name="bundleName" placeholder="Bundle Name" value={this.state.bundleName} onChange={this.handleNameChange.bind(this)}/>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-align-justify"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="textarea" id="bundleDescription" name="bundleDescription" placeholder="Bundle Description" value={this.state.bundleDescription} onChange={this.handleDescriptionChange.bind(this)}/>
                    </InputGroup>
                  </FormGroup>
                </Form>
                        </CardBody>
                    </Card>
              

                </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="chart-wrapper" align="left">
                            <Button size="lg" outline color="primary"  onClick={this.back}>
                                <i className="fa fa-long-arrow-left"></i> Back  
                            </Button>
                        </div>
                    </Col>
                    <Col>
                        <div className="chart-wrapper" align="right">
                            <Button size="lg" color="primary"  onClick={this.generateData.bind(this)}>
                            <i className="fa fa-save"></i> Save to Library  
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Confirmation;