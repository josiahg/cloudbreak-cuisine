const dashboardData = [{
  id: 1,
  cluster_name: 'DSW01',
  state: 'creating',
  progress: '60',
  start_date: '11/28/18 11:30:56',
  create_date: '',
  fail_date: '',
  type: 'hdp',
  version: '3.0',
  services: [{
    1: "HDFS",
    2: "YARN",
    3: "HIVE",
    4: "SPARK",
    6: "ZEPELLIN"
  }],
  recipes: [{
    pre_ambari_start: [{
      1: [{
        name: "init_metastore.sh",
        description: "Installs PG and MySQL DB on cluster for metastores"
      }]
    }],
    post_ambari_start: [],
    post_cluster_install: [{
      1: [{
        name: "load_notebooks.sh",
        description: "Loads all data science workshop Zeppelin notes"
      }],
      2: [{
        name: "install_libaries.sh",
        description: "Install necessary ML Libaries to cluster"
      }]
    }],
    pre_termination: [],
  }],
  bundle_name: 'Data Science Workshop',
  bundle_id: '1'
}, {
  id: 2,
  cluster_name: 'DSW02',
  state: 'creating',
  progress: '80',
  start_date: '11/28/18 11:20:56',
  create_date: '',
  fail_date: '',
  type: 'hdp',
  version: '3.0',
  services: [{
    1: "HDFS",
    2: "YARN",
    3: "HIVE",
    4: "SPARK",
    6: "ZEPELLIN"
  }],
  recipes: [{
    pre_ambari_start: [{
      1: [{
        name: "init_metastore.sh",
        description: "Installs PG and MySQL DB on cluster for metastores"
      }]
    }],
    post_ambari_start: [],
    post_cluster_install: [{
      1: [{
        name: "load_notebooks.sh",
        description: "Loads all data science workshop Zeppelin notes"
      }],
      2: [{
        name: "install_libaries.sh",
        description: "Install necessary ML Libaries to cluster"
      }]
    }],
    pre_termination: [],
  }],
  bundle_name: 'Data Science Workshop',
  bundle_id: '1',
  ambari_link: ''
}, {
  id: 3,
  cluster_name: 'DSW03',
  state: 'failed',
  progress: '87',
  start_date: '11/28/18 11:15:34',
  create_date: '',
  fail_date: '11/28/18 12:03:54',
  type: 'hdp',
  version: '3.0',
  services: [{
    1: "HDFS",
    2: "YARN",
    3: "HIVE",
    4: "SPARK",
    6: "ZEPELLIN"
  }],
  recipes: [{
    pre_ambari_start: [{
      1: [{
        name: "init_metastore.sh",
        description: "Installs PG and MySQL DB on cluster for metastores"
      }]
    }],
    post_ambari_start: [],
    post_cluster_install: [{
      1: [{
        name: "load_notebooks.sh",
        description: "Loads all data science workshop Zeppelin notes"
      }],
      2: [{
        name: "install_libaries.sh",
        description: "Install necessary ML Libaries to cluster"
      }]
    }],
    pre_termination: [],
  }],
  bundle_name: 'Data Science Workshop',
  bundle_id: '1',
  ambari_link: ''
}, {
  id: 4,
  cluster_name: 'DSW04',
  state: 'created',
  progress: '100',
  start_date: '11/28/18 11:10:12',
  create_date: '11/28/18 12:36:29',
  fail_date: '',
  type: 'hdp',
  version: '3.0',
  services: [{
    1: "HDFS",
    2: "YARN",
    3: "HIVE",
    4: "SPARK",
    6: "ZEPELLIN"
  }],
  recipes: [{
    pre_ambari_start: [{
      1: [{
        name: "init_metastore.sh",
        description: "Installs PG and MySQL DB on cluster for metastores"
      }]
    }],
    post_ambari_start: [],
    post_cluster_install: [{
      1: [{
        name: "load_notebooks.sh",
        description: "Loads all data science workshop Zeppelin notes"
      }],
      2: [{
        name: "install_libaries.sh",
        description: "Install necessary ML Libaries to cluster"
      }]
    }],
    pre_termination: [],
  }],
  bundle_name: 'Data Science Workshop',
  bundle_id: '1',
  ambari_link: ''
}]

export default dashboardData