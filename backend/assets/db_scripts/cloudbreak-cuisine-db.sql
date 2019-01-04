-- CREATE DB

CREATE SCHEMA cloudbreak_cuisine;

-- CREATE TABLES
DROP TABLE IF EXISTS cloudbreak_cuisine.clusters;
CREATE TABLE cloudbreak_cuisine.clusters
(
  id integer unique NOT NULL PRIMARY KEY,
  version VARCHAR(50) NOT NULL,
  cluster_type VARCHAR(50) NOT NULL,
  template text
);

DROP TABLE IF EXISTS cloudbreak_cuisine.services;
CREATE TABLE cloudbreak_cuisine.services
(
  id integer unique NOT NULL PRIMARY KEY,
  service_description VARCHAR(50) NOT NULL,
  associated_cluster integer NOT NULL,
  mandatory integer NOT NULL,
  extensible integer NOT NULL
);

DROP TABLE IF EXISTS cloudbreak_cuisine.services_dependencies;
CREATE TABLE cloudbreak_cuisine.services_dependencies
(
  id integer unique NOT NULL PRIMARY KEY,
  service_id integer NOT NULL,
  service_description VARCHAR(50) NOT NULL,
  requires_service_id integer NOT NULL,
  required_service_description VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS cloudbreak_cuisine.components_blueprints;
CREATE TABLE cloudbreak_cuisine.components_blueprints
(
  id integer unique NOT NULL PRIMARY KEY,
  service_id integer NOT NULL,
  component_description VARCHAR(50) NOT NULL,
  config text,
  master_blueprint text,
  worker_blueprint text,
  compute_blueprint text
);

DROP TABLE IF EXISTS cloudbreak_cuisine.components_recipes;
CREATE TABLE cloudbreak_cuisine.components_recipes
(
  id SERIAL NOT NULL PRIMARY KEY,
  service_id integer NOT NULL,
  recipe_description VARCHAR(50) NOT NULL,
  extra_type text,
  pre_ambari_start text,
  post_ambari_start text,
  post_cluster_install text,
  on_termination text
);

DROP TABLE IF EXISTS cloudbreak_cuisine.management_packs;
CREATE TABLE cloudbreak_cuisine.management_packs
(
  id integer unique NOT NULL PRIMARY KEY,
  cluster_id integer NOT NULL,
  description VARCHAR(255) NOT NULL,
  url text
);

DROP TABLE IF EXISTS cloudbreak_cuisine.external_bundles;
CREATE TABLE cloudbreak_cuisine.external_bundles
(
  id SERIAL NOT NULL PRIMARY KEY,
  name text,
  description text,
  is_deployment_ready integer,
  image_url text,
  git_url text,
  zip_url text
);

DROP TABLE IF EXISTS cloudbreak_cuisine.cb_credentials;
CREATE TABLE cloudbreak_cuisine.cb_credentials
(
  id SERIAL PRIMARY KEY,
  instance_name text,
  cb_url text,
  cb_username text,
  cb_password text
);

-- LOAD TABLES

insert into cloudbreak_cuisine.clusters values(1,'3.0','HDP','');
insert into cloudbreak_cuisine.clusters values(2,'3.2','HDF','');
insert into cloudbreak_cuisine.clusters values(3,'3.0','HDP+HDF','');


insert into cloudbreak_cuisine.services values(1,'UTILITIES',1,1,0);
insert into cloudbreak_cuisine.services values(2,'UTILITIES',2,1,0);
insert into cloudbreak_cuisine.services values(3,'UTILITIES',3,1,0);
insert into cloudbreak_cuisine.services values(4,'HDFS',1,1,0);
insert into cloudbreak_cuisine.services values(5,'HDFS',3,1,0);
insert into cloudbreak_cuisine.services values(6,'YARN',1,1,0);
insert into cloudbreak_cuisine.services values(7,'YARN',3,1,0);
insert into cloudbreak_cuisine.services values(8,'HIVE',1,0,1);
insert into cloudbreak_cuisine.services values(9,'HIVE',3,0,1);
insert into cloudbreak_cuisine.services values(10,'HBASE',1,0,1);
insert into cloudbreak_cuisine.services values(11,'HBASE',3,0,1);
insert into cloudbreak_cuisine.services values(12,'SPARK',1,0,0);
insert into cloudbreak_cuisine.services values(13,'SPARK',3,0,0);
insert into cloudbreak_cuisine.services values(14,'DRUID',1,0,0);
insert into cloudbreak_cuisine.services values(15,'DRUID',3,0,0);
insert into cloudbreak_cuisine.services values(16,'SUPERSET',1,0,0);
insert into cloudbreak_cuisine.services values(17,'SUPERSET',3,0,0);
insert into cloudbreak_cuisine.services values(18,'KAFKA',1,0,1);
insert into cloudbreak_cuisine.services values(19,'KAFKA',2,0,1);
insert into cloudbreak_cuisine.services values(20,'KAFKA',3,0,1);
insert into cloudbreak_cuisine.services values(21,'ZEPELLIN',1,0,1);
insert into cloudbreak_cuisine.services values(22,'ZEPELLIN',3,0,1);
insert into cloudbreak_cuisine.services values(23,'ATLAS',1,0,0);
insert into cloudbreak_cuisine.services values(24,'ATLAS',3,0,0);
insert into cloudbreak_cuisine.services values(25,'RANGER',1,0,0);
insert into cloudbreak_cuisine.services values(26,'RANGER',3,0,0);
insert into cloudbreak_cuisine.services values(27,'KNOX',1,0,0);
insert into cloudbreak_cuisine.services values(28,'KNOX',3,0,0);
insert into cloudbreak_cuisine.services values(29,'NIFI',2,0,1);
insert into cloudbreak_cuisine.services values(30,'NIFI',3,0,1);
insert into cloudbreak_cuisine.services values(31,'NIFI REGISTRY',2,0,0);
insert into cloudbreak_cuisine.services values(32,'NIFI REGISTRY',3,0,0);
insert into cloudbreak_cuisine.services values(33,'SCHEMA REGISTRY',2,0,1);
insert into cloudbreak_cuisine.services values(34,'SCHEMA REGISTRY',3,0,1);
insert into cloudbreak_cuisine.services values(35,'STORM',2,0,0);
insert into cloudbreak_cuisine.services values(36,'STORM',3,0,0);
insert into cloudbreak_cuisine.services values(37,'SAM',2,0,0);
insert into cloudbreak_cuisine.services values(38,'SAM',3,0,0);
insert into cloudbreak_cuisine.services values(39,'SOLR',1,0,0);
insert into cloudbreak_cuisine.services values(40,'SOLR',3,0,0);
insert into cloudbreak_cuisine.services values(41,'ZOOKEEPER',1,1,0);
insert into cloudbreak_cuisine.services values(42,'ZOOKEEPER',2,1,0);
insert into cloudbreak_cuisine.services values(43,'ZOOKEEPER',3,1,0);
insert into cloudbreak_cuisine.services values(44,'MAPREDUCE2',1,1,0);
insert into cloudbreak_cuisine.services values(45,'MAPREDUCE2',3,1,0);
insert into cloudbreak_cuisine.services values(46,'AMBARI_METRICS',1,1,0);
insert into cloudbreak_cuisine.services values(47,'AMBARI_METRICS',2,1,0);
insert into cloudbreak_cuisine.services values(48,'AMBARI_METRICS',3,1,0);

insert into cloudbreak_cuisine.services_dependencies values(1,12,'SPARK',8,'HIVE');
insert into cloudbreak_cuisine.services_dependencies values(2,13,'SPARK',9,'HIVE');
insert into cloudbreak_cuisine.services_dependencies values(3,23,'ATLAS',18,'KAFKA');
insert into cloudbreak_cuisine.services_dependencies values(4,24,'ATLAS',20,'KAFKA');
insert into cloudbreak_cuisine.services_dependencies values(5,29,'NIFI',31,'NIFI REGISTRY');
insert into cloudbreak_cuisine.services_dependencies values(6,30,'NIFI',32,'NIFI REGISTRY');
insert into cloudbreak_cuisine.services_dependencies values(7,37,'SAM',35,'STORM');
insert into cloudbreak_cuisine.services_dependencies values(8,38,'SAM',36,'STORM');
insert into cloudbreak_cuisine.services_dependencies values(9,14,'DRUID',18,'KAFKA');
insert into cloudbreak_cuisine.services_dependencies values(10,15,'DRUID',20,'KAFKA');
insert into cloudbreak_cuisine.services_dependencies values(11,16,'SUPERSET',14,'DRUID');
insert into cloudbreak_cuisine.services_dependencies values(12,17,'SUPERSET',15,'DRUID');
insert into cloudbreak_cuisine.services_dependencies values(13,37,'SAM',33,'SCHEMA REGISTRY');
insert into cloudbreak_cuisine.services_dependencies values(14,38,'SAM',34,'SCHEMA REGISTRY');

insert into cloudbreak_cuisine.components_blueprints values(1,4,'HDFS_GENERAL','{"core-site":{"properties_attributes":{},"properties":{"fs.s3a.threads.max":"1000","fs.s3a.threads.core":"500","fs.s3a.max.total.tasks":"1000","fs.s3a.connection.maximum":"1500"}}},{"hdfs-site":{"properties_attributes":{},"properties":{}}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(2,4,'HDFS_NAMENODE','','{"name":"NAMENODE"}','','');
insert into cloudbreak_cuisine.components_blueprints values(3,4,'HDFS_SECONDARY_NAMENODE','','{"name":"SECONDARY_NAMENODE"}','','');
insert into cloudbreak_cuisine.components_blueprints values(4,4,'HDFS_DATANODE','','{"name":"DATANODE"}','{"name":"DATANODE"}','');
insert into cloudbreak_cuisine.components_blueprints values(5,4,'HDFS_JOURNALNODE','','{"name":"JOURNALNODE"}','','');
insert into cloudbreak_cuisine.components_blueprints values(6,4,'HDFS_CLIENT','','{"name":"HDFS_CLIENT"}','{"name":"HDFS_CLIENT"}','{"name":"HDFS_CLIENT"}');
insert into cloudbreak_cuisine.components_blueprints values(7,5,'HDFS_GENERAL','{"core-site":{"properties_attributes":{},"properties":{"fs.s3a.threads.max":"1000","fs.s3a.threads.core":"500","fs.s3a.max.total.tasks":"1000","fs.s3a.connection.maximum":"1500"}}},{"hdfs-site":{"properties_attributes":{},"properties":{}}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(8,5,'HDFS_NAMENODE','','{"name":"NAMENODE"}','','');
insert into cloudbreak_cuisine.components_blueprints values(9,5,'HDFS_SECONDARY_NAMENODE','','{"name":"SECONDARY_NAMENODE"}','','');
insert into cloudbreak_cuisine.components_blueprints values(10,5,'HDFS_DATANODE','','{"name":"DATANODE"}','{"name":"DATANODE"}','');
insert into cloudbreak_cuisine.components_blueprints values(11,4,'HDFS_JOURNALNODE','','{"name":"JOURNALNODE"}','','');
insert into cloudbreak_cuisine.components_blueprints values(12,5,'HDFS_CLIENT','','{"name":"HDFS_CLIENT"}','{"name":"HDFS_CLIENT"}','{"name":"HDFS_CLIENT"}');
insert into cloudbreak_cuisine.components_blueprints values(13,6,'YARN_GENERAL','{"yarn-site":{"properties":{"yarn.nodemanager.resource.cpu-vcores":"6","yarn.nodemanager.resource.memory-mb":"23296","yarn.scheduler.maximum-allocation-mb":"23296"}}},{"capacity-scheduler":{"properties":{"yarn.scheduler.capacity.root.queues":"default","yarn.scheduler.capacity.root.capacity":"100","yarn.scheduler.capacity.root.maximum-capacity":"100","yarn.scheduler.capacity.root.default.capacity":"100","yarn.scheduler.capacity.root.default.maximum-capacity":"100"}}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(14,6,'YARN_NODEMANAGER','','{"name":"NODEMANAGER"}','{"name":"NODEMANAGER"}','{"name":"NODEMANAGER"}');
insert into cloudbreak_cuisine.components_blueprints values(15,6,'YARN_RESOURCEMANAGER','','{"name":"RESOURCEMANAGER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(16,6,'YARN_TIMELINE_SERVER','','{"name":"APP_TIMELINE_SERVER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(17,6,'YARN_CLIENT','','{"name":"YARN_CLIENT"}','{"name":"YARN_CLIENT"}','{"name":"YARN_CLIENT"}');
insert into cloudbreak_cuisine.components_blueprints values(18,6,'YARN_GENERAL','{"yarn-site":{"properties":{"yarn.nodemanager.resource.cpu-vcores":"6","yarn.nodemanager.resource.memory-mb":"23296","yarn.scheduler.maximum-allocation-mb":"23296"}}},{"capacity-scheduler":{"properties":{"yarn.scheduler.capacity.root.queues":"default","yarn.scheduler.capacity.root.capacity":"100","yarn.scheduler.capacity.root.maximum-capacity":"100","yarn.scheduler.capacity.root.default.capacity":"100","yarn.scheduler.capacity.root.default.maximum-capacity":"100"}}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(19,6,'YARN_NODEMANAGER','','{"name":"NODEMANAGER"}','{"name":"NODEMANAGER"}','{"name":"NODEMANAGER"}');
insert into cloudbreak_cuisine.components_blueprints values(20,6,'YARN_RESOURCEMANAGER','','{"name":"RESOURCEMANAGER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(21,6,'YARN_TIMELINE_SERVER','','{"name":"APP_TIMELINE_SERVER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(22,6,'YARN_CLIENT','','{"name":"YARN_CLIENT"}','{"name":"YARN_CLIENT"}','{"name":"YARN_CLIENT"}');
insert into cloudbreak_cuisine.components_blueprints values(23,41,'ZOOKEEPER_SERVER','','{"name":"ZOOKEEPER_SERVER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(24,41,'ZOOKEEPER_CLIENT','','{"name":"ZOOKEEPER_CLIENT"}','{"name":"ZOOKEEPER_CLIENT"}','{"name":"ZOOKEEPER_CLIENT"}');
insert into cloudbreak_cuisine.components_blueprints values(25,41,'ZOOKEEPER_SERVER','','{"name":"ZOOKEEPER_SERVER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(26,41,'ZOOKEEPER_CLIENT','','{"name":"ZOOKEEPER_CLIENT"}','{"name":"ZOOKEEPER_CLIENT"}','{"name":"ZOOKEEPER_CLIENT"}');
insert into cloudbreak_cuisine.components_blueprints values(27,42,'ZOOKEEPER_SERVER','','{"name":"ZOOKEEPER_SERVER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(28,42,'ZOOKEEPER_CLIENT','','{"name":"ZOOKEEPER_CLIENT"}','{"name":"ZOOKEEPER_CLIENT"}','{"name":"ZOOKEEPER_CLIENT"}');
insert into cloudbreak_cuisine.components_blueprints values(29,44,'MAPREDUCE2_HISTORYSERVER','','{"name":"HISTORYSERVER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(30,44,'MAPREDUCE2_CLIENT','','{"name":"HISTORYSERVER"}','{"name":"HISTORYSERVER"}','{"name":"HISTORYSERVER"}');
insert into cloudbreak_cuisine.components_blueprints values(31,45,'MAPREDUCE2_HISTORYSERVER','','{"name":"HISTORYSERVER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(32,45,'MAPREDUCE2_CLIENT','','{"name":"HISTORYSERVER"}','{"name":"HISTORYSERVER"}','{"name":"HISTORYSERVER"}');
insert into cloudbreak_cuisine.components_blueprints values(33,46,'AMBARI_METRICS_COLLECTOR','','{"name":"METRICS_COLLECTOR"}','','');
insert into cloudbreak_cuisine.components_blueprints values(34,46,'AMBARI_METRICS_MONITOR','','{"name":"METRICS_MONITOR"}','{"name":"METRICS_MONITOR"}','{"name":"METRICS_MONITOR"}');
insert into cloudbreak_cuisine.components_blueprints values(35,47,'AMBARI_METRICS_COLLECTOR','','{"name":"METRICS_COLLECTOR"}','','');
insert into cloudbreak_cuisine.components_blueprints values(36,47,'AMBARI_METRICS_MONITOR','','{"name":"METRICS_MONITOR"}','{"name":"METRICS_MONITOR"}','{"name":"METRICS_MONITOR"}');
insert into cloudbreak_cuisine.components_blueprints values(37,48,'AMBARI_METRICS_COLLECTOR','','{"name":"METRICS_COLLECTOR"}','','');
insert into cloudbreak_cuisine.components_blueprints values(38,48,'AMBARI_METRICS_MONITOR','','{"name":"METRICS_MONITOR"}','{"name":"METRICS_MONITOR"}','{"name":"METRICS_MONITOR"}');
insert into cloudbreak_cuisine.components_blueprints values(39,8,'HIVE_GENERAL','{"hive-site":{"hive.exec.compress.output":"true","hive.merge.mapfiles":"true","hive.server2.tez.initialize.default.sessions":"true","hive.server2.transport.mode":"http"}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(40,8,'HIVE_SERVER','','{"name":"HIVE_SERVER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(41,8,'HIVE_METASTORE','','{"name":"HIVE_METASTORE"}','','');
insert into cloudbreak_cuisine.components_blueprints values(42,8,'HIVE_CLIENT','','{"name":"HIVE_CLIENT"}','{"name":"HIVE_CLIENT"}','{"name":"HIVE_CLIENT"}');
insert into cloudbreak_cuisine.components_blueprints values(43,8,'HIVE_TEZ_CLIENT','','{"name":"TEZ_CLIENT"}','{"name":"TEZ_CLIENT"}','{"name":"TEZ_CLIENT"}');
insert into cloudbreak_cuisine.components_blueprints values(44,9,'HIVE_GENERAL','{"hive-site":{"hive.exec.compress.output":"true","hive.merge.mapfiles":"true","hive.server2.tez.initialize.default.sessions":"true","hive.server2.transport.mode":"http"}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(45,9,'HIVE_SERVER','','{"name":"HIVE_SERVER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(46,9,'HIVE_METASTORE','','{"name":"HIVE_METASTORE"}','','');
insert into cloudbreak_cuisine.components_blueprints values(47,9,'HIVE_CLIENT','','{"name":"HIVE_CLIENT"}','{"name":"HIVE_CLIENT"}','{"name":"HIVE_CLIENT"}');
insert into cloudbreak_cuisine.components_blueprints values(48,9,'HIVE_TEZ_CLIENT','','{"name":"TEZ_CLIENT"}','{"name":"TEZ_CLIENT"}','{"name":"TEZ_CLIENT"}');
insert into cloudbreak_cuisine.components_blueprints values(49,10,'HBASE_GENERAL','{"hbase-site":{"properties_attributes":{},"properties":{"phoenix.query.timeoutMs":"60000","hfile.block.cache.size":"0.4","hbase.regionserver.global.memstore.size":"0.4","hbase.regionserver.handler.count":"60","hbase.hregion.memstore.flush.size":"536870912","hbase.hregion.max.filesize":"21474836480","hbase.regionserver.wal.codec":"org.apache.hadoop.hbase.regionserver.wal.IndexedWALEditCodec","hbase.defaults.for.version.skip":"true","hbase.region.server.rpc.scheduler.factory.class":"org.apache.hadoop.hbase.ipc.PhoenixRpcSchedulerFactory","hbase.rpc.controllerfactory.class":"org.apache.hadoop.hbase.ipc.controller.ServerRpcControllerFactory","phoenix.functions.allowUserDefinedFunctions":"true","hbase.bucketcache.size":"24000","hbase.bucketcache.ioengine":"file:/hbase/cache","hbase.bucketcache.combinedcache.enabled":"true","hbase.rs.cacheblocksonwrite":"true","hfile.block.bloom.cacheonwrite":"true","hfile.block.index.cacheonwrite":"true","hbase.rootdir":"/apps/hbase"}}},{"hbase-env":{"properties_attributes":{},"properties":{"hbase_java_io_tmpdir":"/tmp","hbase_log_dir":"/var/log/hbase","hbase_master_heapsize":"1024m","hbase_pid_dir":"/var/run/hbase","hbase_regionserver_heapsize":"12000m","hbase_regionserver_shutdown_timeout":"30","hbase_regionserver_xmn_max":"12000","hbase_regionserver_xmn_ratio":"0.2","hbase_user":"hbase","hbase_user_nofile_limit":"32000","hbase_user_nproc_limit":"16000","phoenix_sql_enabled":"true"}}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(50,10,'HBASE_MASTER','','{"name":"HBASE_MASTER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(51,10,'HBASE_REGIONSERVER','','{"name":"HBASE_REGIONSERVER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(52,10,'HBASE_CLIENT','','{"name":"HBASE_CLIENT"}','{"name":"HBASE_CLIENT"}','{"name":"HBASE_CLIENT"}');
insert into cloudbreak_cuisine.components_blueprints values(53,11,'HBASE_GENERAL','{"hbase-site":{"properties_attributes":{},"properties":{"phoenix.query.timeoutMs":"60000","hfile.block.cache.size":"0.4","hbase.regionserver.global.memstore.size":"0.4","hbase.regionserver.handler.count":"60","hbase.hregion.memstore.flush.size":"536870912","hbase.hregion.max.filesize":"21474836480","hbase.regionserver.wal.codec":"org.apache.hadoop.hbase.regionserver.wal.IndexedWALEditCodec","hbase.defaults.for.version.skip":"true","hbase.region.server.rpc.scheduler.factory.class":"org.apache.hadoop.hbase.ipc.PhoenixRpcSchedulerFactory","hbase.rpc.controllerfactory.class":"org.apache.hadoop.hbase.ipc.controller.ServerRpcControllerFactory","phoenix.functions.allowUserDefinedFunctions":"true","hbase.bucketcache.size":"24000","hbase.bucketcache.ioengine":"file:/hbase/cache","hbase.bucketcache.combinedcache.enabled":"true","hbase.rs.cacheblocksonwrite":"true","hfile.block.bloom.cacheonwrite":"true","hfile.block.index.cacheonwrite":"true","hbase.rootdir":"/apps/hbase"}}},{"hbase-env":{"properties_attributes":{},"properties":{"hbase_java_io_tmpdir":"/tmp","hbase_log_dir":"/var/log/hbase","hbase_master_heapsize":"1024m","hbase_pid_dir":"/var/run/hbase","hbase_regionserver_heapsize":"12000m","hbase_regionserver_shutdown_timeout":"30","hbase_regionserver_xmn_max":"12000","hbase_regionserver_xmn_ratio":"0.2","hbase_user":"hbase","hbase_user_nofile_limit":"32000","hbase_user_nproc_limit":"16000","phoenix_sql_enabled":"true"}}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(54,11,'HBASE_MASTER','','{"name":"HBASE_MASTER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(55,11,'HBASE_REGIONSERVER','','{"name":"HBASE_REGIONSERVER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(56,11,'HBASE_CLIENT','','{"name":"HBASE_CLIENT"}','{"name":"HBASE_CLIENT"}','{"name":"HBASE_CLIENT"}');
insert into cloudbreak_cuisine.components_blueprints values(57,12,'SPARK2_GENERAL','{"spark2-defaults":{"properties_attributes":{},"properties":{"spark.sql.hive.hiveserver2.jdbc.url":"jdbc:hive2://%HOSTGROUP::master%:2181/;serviceDiscoveryMode=zooKeeper;zooKeeperNamespace=hiveserver2","spark.sql.hive.hiveserver2.jdbc.url.principal":"hive/_HOST@EC2.INTERNAL","spark.datasource.hive.warehouse.metastoreUri":"thrift://%HOSTGROUP::master%:9083","spark.datasource.hive.warehouse.load.staging.dir":"/tmp","spark.hadoop.hive.zookeeper.quorum":"%HOSTGROUP::master%:2181"}}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(58,12,'SPARK2_LIVY_SERVER','','{"name":"LIVY2_SERVER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(59,12,'SPARK2_JOBHISTORYSERVER','','{"name":"SPARK2_JOBHISTORYSERVER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(60,12,'SPARK2_CLIENT','','{"name":"SPARK2_CLIENT"}','{"name":"SPARK2_CLIENT"}','{"name":"SPARK2_CLIENT"}');
insert into cloudbreak_cuisine.components_blueprints values(61,13,'SPARK2_GENERAL','{"spark2-defaults":{"properties_attributes":{},"properties":{"spark.sql.hive.hiveserver2.jdbc.url":"jdbc:hive2://%HOSTGROUP::master%:2181/;serviceDiscoveryMode=zooKeeper;zooKeeperNamespace=hiveserver2","spark.sql.hive.hiveserver2.jdbc.url.principal":"hive/_HOST@EC2.INTERNAL","spark.datasource.hive.warehouse.metastoreUri":"thrift://%HOSTGROUP::master%:9083","spark.datasource.hive.warehouse.load.staging.dir":"/tmp","spark.hadoop.hive.zookeeper.quorum":"%HOSTGROUP::master%:2181"}}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(62,13,'SPARK2_LIVY_SERVER','','{"name":"LIVY2_SERVER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(63,13,'SPARK2_JOBHISTORYSERVER','','{"name":"SPARK2_JOBHISTORYSERVER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(64,13,'SPARK2_CLIENT','','{"name":"SPARK2_CLIENT"}','{"name":"SPARK2_CLIENT"}','{"name":"SPARK2_CLIENT"}');
insert into cloudbreak_cuisine.components_blueprints values(65,18,'KAFKA_GENERAL','{"kafka-broker":{"properties_attributes":{},"properties":{"default.replication.factor":"1","offsets.topic.replication.factor":"1"}}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(66,18,'KAFKA_BROKER','','{"name":"KAFKA_BROKER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(67,19,'KAFKA_GENERAL','{"kafka-broker":{"properties_attributes":{},"properties":{"default.replication.factor":"1","offsets.topic.replication.factor":"1"}}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(68,19,'KAFKA_BROKER','','{"name":"KAFKA_BROKER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(69,20,'KAFKA_GENERAL','{"kafka-broker":{"properties_attributes":{},"properties":{"default.replication.factor":"1","offsets.topic.replication.factor":"1"}}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(70,20,'KAFKA_BROKER','','{"name":"KAFKA_BROKER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(71,21,'ZEPPELIN_MASTER','','{"name":"ZEPPELIN_MASTER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(72,22,'ZEPPELIN_MASTER','','{"name":"ZEPPELIN_MASTER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(73,39,'INFRA_SOLR','','{"name":"INFRA_SOLR"}','','');
insert into cloudbreak_cuisine.components_blueprints values(74,39,'INFRA_SOLR','','{"name":"INFRA_SOLR_CLIENT"}','{"name":"INFRA_SOLR_CLIENT"}','{"name":"INFRA_SOLR_CLIENT"}');
insert into cloudbreak_cuisine.components_blueprints values(75,39,'INFRA_SOLR','','{"name":"INFRA_SOLR"}','','');
insert into cloudbreak_cuisine.components_blueprints values(76,39,'INFRA_SOLR','','{"name":"INFRA_SOLR_CLIENT"}','{"name":"INFRA_SOLR_CLIENT"}','{"name":"INFRA_SOLR_CLIENT"}');
insert into cloudbreak_cuisine.components_blueprints values(77,29,'NIFI_GENERAL','{"nifi-ambari-config":{"nifi.sensitive.props.key":"{{{ general.password }}}","nifi.security.encrypt.configuration.password":"{{{ general.password }}}","nifi.max_mem":"4g"}},{"nifi-properties":{"nifi.sensitive.props.key":"{{{ general.password }}}","nifi.security.user.login.identity.provider":""}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(78,29,'NIFI_MASTER','','{"name":"NIFI_MASTER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(79,29,'NIFI_CA','','{"name":"NIFI_CA"}','','');
insert into cloudbreak_cuisine.components_blueprints values(80,30,'NIFI_GENERAL','{"nifi-ambari-config":{"nifi.sensitive.props.key":"{{{ general.password }}}","nifi.security.encrypt.configuration.password":"{{{ general.password }}}","nifi.max_mem":"4g"}},{"nifi-properties":{"nifi.sensitive.props.key":"{{{ general.password }}}","nifi.security.user.login.identity.provider":""}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(81,30,'NIFI_MASTER','','','{"name":"NIFI_MASTER"}','');
insert into cloudbreak_cuisine.components_blueprints values(82,30,'NIFI_CA','','','{"name":"NIFI_CA"}','');
insert into cloudbreak_cuisine.components_blueprints values(83,31,'NIFI_REGISTRY_GENERAL','{"nifi-registry-ambari-config":{"nifi.registry.security.encrypt.configuration.password":"{{{ general.password }}}"}},{"nifi-registry-properties":{"nifi.registry.sensitive.props.key":"{{{ general.password }}}","nifi.registry.db.password":"{{{ general.password }}}"}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(84,31,'NIFI_REGISTRY_MASTER','','{"name":"NIFI_REGISTRY_MASTER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(85,32,'NIFI_REGISTRY_GENERAL','{"nifi-registry-ambari-config":{"nifi.registry.security.encrypt.configuration.password":"{{{ general.password }}}"}},{"nifi-registry-properties":{"nifi.registry.sensitive.props.key":"{{{ general.password }}}","nifi.registry.db.password":"{{{ general.password }}}"}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(86,32,'NIFI_REGISTRY_MASTER','','','{"name":"NIFI_REGISTRY_MASTER"}','');
insert into cloudbreak_cuisine.components_blueprints values(87,27,'KNOX_GATEWAY','','{"name":"KNOX_GATEWAY"}','','');
insert into cloudbreak_cuisine.components_blueprints values(88,28,'KNOX_GATEWAY','','{"name":"KNOX_GATEWAY"}','','');
insert into cloudbreak_cuisine.components_blueprints values(89,23,'ATLAS_GENERAL','{"atlas-env":{"properties_attributes":{},"properties":{"atlas.admin.password":"{{{ general.password }}}"}}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(90,23,'ATLAS_SERVER','','{"name":"ATLAS_SERVER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(91,23,'ATLAS_CLIENT','','{"name":"ATLAS_CLIENT"}','{"name":"ATLAS_CLIENT"}','{"name":"ATLAS_CLIENT"}');
insert into cloudbreak_cuisine.components_blueprints values(92,24,'ATLAS_GENERAL','{"atlas-env":{"properties_attributes":{},"properties":{"atlas.admin.password":"{{{ general.password }}}"}}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(93,24,'ATLAS_SERVER','','{"name":"ATLAS_SERVER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(94,24,'ATLAS_CLIENT','','{"name":"ATLAS_CLIENT"}','{"name":"ATLAS_CLIENT"}','{"name":"ATLAS_CLIENT"}');
insert into cloudbreak_cuisine.components_blueprints values(95,25,'RANGER_GENERAL','{"ranger-admin-site":{"properties_attributes":{},"properties":{"ranger.jpa.jdbc.url":"jdbc:postgresql://localhost:5432/ranger"}}},{"ranger-env":{"properties_attributes":{},"properties":{"xasecure.audit.destination.hdfs.dir":"/apps/ranger/audit","ranger_admin_password":"{{{ general.password }}}","keyadmin_user_password":"{{{ general.password }}}","rangertagsync_user_password":"{{{ general.password }}}","rangerusersync_user_password":"{{{ general.password }}}","is_solrCloud_enabled":"true","ranger-hdfs-plugin-enabled":"Yes","ranger-hive-plugin-enabled":"No","ranger-atlas-plugin-enabled":"No","ranger-knox-plugin-enabled":"No"}}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(96,25,'RANGER_TAGSYNC','','{"name":"RANGER_TAGSYNC"}','','');
insert into cloudbreak_cuisine.components_blueprints values(97,25,'RANGER_TAGSYNC','','{"name":"RANGER_USERSYNC"}','','');
insert into cloudbreak_cuisine.components_blueprints values(98,25,'RANGER_ADMIN','','{"name":"RANGER_ADMIN"}','','');
insert into cloudbreak_cuisine.components_blueprints values(99,26,'RANGER_GENERAL','{"ranger-admin-site":{"properties_attributes":{},"properties":{"ranger.jpa.jdbc.url":"jdbc:postgresql://localhost:5432/ranger"}}},{"ranger-env":{"properties_attributes":{},"properties":{"xasecure.audit.destination.hdfs.dir":"/apps/ranger/audit","ranger_admin_password":"{{{ general.password }}}","keyadmin_user_password":"{{{ general.password }}}","rangertagsync_user_password":"{{{ general.password }}}","rangerusersync_user_password":"{{{ general.password }}}","is_solrCloud_enabled":"true","ranger-hdfs-plugin-enabled":"Yes","ranger-hive-plugin-enabled":"No","ranger-atlas-plugin-enabled":"No","ranger-knox-plugin-enabled":"No"}}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(100,26,'RANGER_TAGSYNC','','{"name":"RANGER_TAGSYNC"}','','');
insert into cloudbreak_cuisine.components_blueprints values(101,26,'RANGER_TAGSYNC','','{"name":"RANGER_USERSYNC"}','','');
insert into cloudbreak_cuisine.components_blueprints values(102,26,'RANGER_ADMIN','','{"name":"RANGER_ADMIN"}','','');
insert into cloudbreak_cuisine.components_blueprints values(103,14,'DRUID_GENERAL','{"druid-common":{"properties_attributes":{},"properties":{"druid.metadata.storage.type":"postgresql","druid.metadata.storage.connector.user":"druid","druid.metadata.storage.connector.password":"druid","druid.metadata.storage.connector.connectURI":"jdbc:postgresql://%HOSTGROUP::master%:5432/druid","druid.extensions.loadList":"[\"postgresql-metadata-storage\",\"druid-datasketches\", \"druid-hdfs-storage\", \"druid-kafka-indexing-service\", \"ambari-metrics-emitter\"]","druid.selectors.indexing.serviceName":"druid/overlord","druid.storage.type":"hdfs","druid.storage.storageDirectory":"/apps/druid/warehouse","druid.storage.useS3aSchema":"true","druid.indexer.logs.type":"hdfs","druid.indexer.logs.directory":"/user/druid/logs"}}},{"druid-overlord":{"properties_attributes":{},"properties":{"druid.indexer.storage.type":"metadata","druid.indexer.runner.type":"remote","druid.service":"druid/overlord","druid.port":"8090","druid.indexer.logs.type":"hdfs","druid.indexer.logs.directory":"/user/druid/logs"}}},{"druid-middlemanager":{"properties_attributes":{},"properties":{"druid.server.http.numThreads":"50","druid.worker.capacity":"3","druid.processing.numThreads":"2","druid.indexer.runner.javaOpts":"-server -Xmx2g -Duser.timezone=UTC -Dfile.encoding=UTF-8 -Djava.util.logging.manager=org.apache.logging.log4j.jul.LogManager -Dhdp.version={{stack_version}} -Dhadoop.mapreduce.job.classloader=true","druid.service":"druid/middlemanager","druid.port":"8091","druid.indexer.logs.type":"hdfs","druid.indexer.logs.directory":"/user/druid/logs","druid.indexer.fork.property.druid.storage.storageDirectory":"/apps/druid/warehouse","druid.indexer.fork.property.druid.storage.type":"hdfs"}}},{"druid-coordinator":{"properties_attributes":{},"properties":{"druid.coordinator.merge.on":"false","druid.port":"8081"}}},{"druid-historical":{"properties_attributes":{},"properties":{"druid.server.http.numThreads":"50","druid.processing.numThreads":"2","druid.service":"druid/historical","druid.port":"8083","druid.server.maxSize":"300000000000"}}},{"druid-broker":{"properties_attributes":{},"properties":{"druid.cache.type":"local","druid.server.http.numThreads":"50","druid.broker.http.numConnections":"5","druid.processing.numThreads":"2","druid.service":"druid/broker","druid.port":"8082"}}},{"druid-router":{"properties_attributes":{},"properties":{}}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(104,14,'DRUID_OVERLORD','','{"name":"DRUID_OVERLORD"}','','');
insert into cloudbreak_cuisine.components_blueprints values(105,14,'DRUID_COORDINATOR','','{"name":"DRUID_COORDINATOR"}','','');
insert into cloudbreak_cuisine.components_blueprints values(106,14,'DRUID_ROUTER','','{"name":"DRUID_ROUTER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(107,14,'DRUID_BROKER','','{"name":"DRUID_BROKER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(108,14,'DRUID_HISTORICAL','','','{"name":"DRUID_HISTORICAL"}','');
insert into cloudbreak_cuisine.components_blueprints values(109,14,'DRUID_MIDDLEMANAGER','','','{"name":"DRUID_MIDDLEMANAGER"}','');
insert into cloudbreak_cuisine.components_blueprints values(110,15,'DRUID_GENERAL','{"druid-common":{"properties_attributes":{},"properties":{"druid.metadata.storage.type":"postgresql","druid.metadata.storage.connector.user":"druid","druid.metadata.storage.connector.password":"druid","druid.metadata.storage.connector.connectURI":"jdbc:postgresql://%HOSTGROUP::master%:5432/druid","druid.extensions.loadList":"[\"postgresql-metadata-storage\",\"druid-datasketches\", \"druid-hdfs-storage\", \"druid-kafka-indexing-service\", \"ambari-metrics-emitter\"]","druid.selectors.indexing.serviceName":"druid/overlord","druid.storage.type":"hdfs","druid.storage.storageDirectory":"/apps/druid/warehouse","druid.storage.useS3aSchema":"true","druid.indexer.logs.type":"hdfs","druid.indexer.logs.directory":"/user/druid/logs"}}},{"druid-overlord":{"properties_attributes":{},"properties":{"druid.indexer.storage.type":"metadata","druid.indexer.runner.type":"remote","druid.service":"druid/overlord","druid.port":"8090","druid.indexer.logs.type":"hdfs","druid.indexer.logs.directory":"/user/druid/logs"}}},{"druid-middlemanager":{"properties_attributes":{},"properties":{"druid.server.http.numThreads":"50","druid.worker.capacity":"3","druid.processing.numThreads":"2","druid.indexer.runner.javaOpts":"-server -Xmx2g -Duser.timezone=UTC -Dfile.encoding=UTF-8 -Djava.util.logging.manager=org.apache.logging.log4j.jul.LogManager -Dhdp.version={{stack_version}} -Dhadoop.mapreduce.job.classloader=true","druid.service":"druid/middlemanager","druid.port":"8091","druid.indexer.logs.type":"hdfs","druid.indexer.logs.directory":"/user/druid/logs","druid.indexer.fork.property.druid.storage.storageDirectory":"/apps/druid/warehouse","druid.indexer.fork.property.druid.storage.type":"hdfs"}}},{"druid-coordinator":{"properties_attributes":{},"properties":{"druid.coordinator.merge.on":"false","druid.port":"8081"}}},{"druid-historical":{"properties_attributes":{},"properties":{"druid.server.http.numThreads":"50","druid.processing.numThreads":"2","druid.service":"druid/historical","druid.port":"8083","druid.server.maxSize":"300000000000"}}},{"druid-broker":{"properties_attributes":{},"properties":{"druid.cache.type":"local","druid.server.http.numThreads":"50","druid.broker.http.numConnections":"5","druid.processing.numThreads":"2","druid.service":"druid/broker","druid.port":"8082"}}},{"druid-router":{"properties_attributes":{},"properties":{}}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(111,15,'DRUID_OVERLORD','','{"name":"DRUID_OVERLORD"}','','');
insert into cloudbreak_cuisine.components_blueprints values(112,15,'DRUID_COORDINATOR','','{"name":"DRUID_COORDINATOR"}','','');
insert into cloudbreak_cuisine.components_blueprints values(113,15,'DRUID_ROUTER','','{"name":"DRUID_ROUTER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(114,15,'DRUID_BROKER','','{"name":"DRUID_BROKER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(115,15,'DRUID_HISTORICAL','','','{"name":"DRUID_HISTORICAL"}','');
insert into cloudbreak_cuisine.components_blueprints values(116,15,'DRUID_MIDDLEMANAGER','','','{"name":"DRUID_MIDDLEMANAGER"}','');
insert into cloudbreak_cuisine.components_blueprints values(117,16,'SUPERSET_GENERAL','{"superset":{"properties_attributes":{},"properties":{"SECRET_KEY":"{{{ general.password }}}","SUPERSET_DATABASE_TYPE":"sqlite"}}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(118,16,'SUPERSET_SERVER','','{"name":"SUPERSET"}','','');
insert into cloudbreak_cuisine.components_blueprints values(119,17,'SUPERSET_GENERAL','{"superset":{"properties_attributes":{},"properties":{"SECRET_KEY":"{{{ general.password }}}","SUPERSET_DATABASE_TYPE":"sqlite"}}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(120,17,'SUPERSET_SERVER','','{"name":"SUPERSET"}','','');
insert into cloudbreak_cuisine.components_blueprints values(121,33,'SCHEMA_REGISTRY_GENERAL','{"registry-common":{"properties_attributes":{},"properties":{"jar.storage.type":"local","database_name":"registry","registry.storage.query.timeout":"30","registry.schema.cache.expiry.interval":"3600","registry.storage.connector.connectURI":"jdbc:mysql://localhost:3306/registry","jar.storage":"/hdf/registry","registry.storage.connector.user":"registry","registry.storage.connector.password":"registry","jar.storage.hdfs.url":"hdfs://localhost:9090","port":"7788","adminPort":"7789","registry.schema.cache.size":"10000","registry.storage.type":"mysql"}}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(122,33,'SCHEMA_REGISTRY_SERVER','','{"name":"REGISTRY_SERVER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(123,34,'SCHEMA_REGISTRY_GENERAL','{"registry-common":{"properties_attributes":{},"properties":{"jar.storage.type":"local","database_name":"registry","registry.storage.query.timeout":"30","registry.schema.cache.expiry.interval":"3600","registry.storage.connector.connectURI":"jdbc:mysql://localhost:3306/registry","jar.storage":"/hdf/registry","registry.storage.connector.user":"registry","registry.storage.connector.password":"registry","jar.storage.hdfs.url":"hdfs://localhost:9090","port":"7788","adminPort":"7789","registry.schema.cache.size":"10000","registry.storage.type":"mysql"}}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(124,34,'SCHEMA_REGISTRY_SERVER','','{"name":"REGISTRY_SERVER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(125,35,'STORM_GENERAL','{"storm-env":{"properties_attributes":{},"properties":{"storm_user_nofile_limit":"128000","jmxremote_port":"56431","storm.atlas.hook":"true","storm_log_dir":"/var/log/storm","storm_pid_dir":"/var/run/storm","nimbus_seeds_supported":"true","storm_logs_supported":"true","storm_user":"storm","storm_user_nproc_limit":"65536","content":"\n#!/bin/bash\n\n# Set Storm specific environment variables here.\n\n# The java implementation to use.\nexport JAVA_HOME={{java64_home}}\n\nexport STORM_CONF_DIR={{conf_dir}}\nexport STORM_HOME={{storm_component_home_dir}}\n\nexport STORM_JAR_JVM_OPTS={{jar_jvm_opts}}\n\n#set storm-auto creds\n# check if storm_jaas.conf in config , only enable storm_auto_creds in secure mode.\nSTORM_JAAS_CONF=$STORM_HOME/conf/storm_jaas.conf\nSTORM_AUTOCREDS_LIB_DIR=$STORM_HOME/external/storm-autocreds\n\nif [ -f $STORM_JAAS_CONF ] && [ -d $STORM_AUTOCREDS_LIB_DIR ]; then\n  export STORM_EXT_CLASSPATH=\"$STORM_AUTOCREDS_LIB_DIR/*\"\nfi"}}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(126,35,'STORM_UI_SERVER','','{"name":"STORM_UI_SERVER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(127,36,'STORM_GENERAL','{"storm-env":{"properties_attributes":{},"properties":{"storm_user_nofile_limit":"128000","jmxremote_port":"56431","storm.atlas.hook":"true","storm_log_dir":"/var/log/storm","storm_pid_dir":"/var/run/storm","nimbus_seeds_supported":"true","storm_logs_supported":"true","storm_user":"storm","storm_user_nproc_limit":"65536","content":"\n#!/bin/bash\n\n# Set Storm specific environment variables here.\n\n# The java implementation to use.\nexport JAVA_HOME={{java64_home}}\n\nexport STORM_CONF_DIR={{conf_dir}}\nexport STORM_HOME={{storm_component_home_dir}}\n\nexport STORM_JAR_JVM_OPTS={{jar_jvm_opts}}\n\n#set storm-auto creds\n# check if storm_jaas.conf in config , only enable storm_auto_creds in secure mode.\nSTORM_JAAS_CONF=$STORM_HOME/conf/storm_jaas.conf\nSTORM_AUTOCREDS_LIB_DIR=$STORM_HOME/external/storm-autocreds\n\nif [ -f $STORM_JAAS_CONF ] && [ -d $STORM_AUTOCREDS_LIB_DIR ]; then\n  export STORM_EXT_CLASSPATH=\"$STORM_AUTOCREDS_LIB_DIR/*\"\nfi"}}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(128,36,'STORM_UI_SERVER','','{"name":"STORM_UI_SERVER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(129,37,'SAM_GENERAL','{"streamline-common":{"jar.storage.type":"local","streamline.storage.type":"mysql","streamline.storage.connector.connectURI":"jdbc:mysql://localhost:3306/streamline","registry.url":"http://localhost:7788/api/v1","streamline.dashboard.url":"http://localhost:9089","streamline.storage.connector.password":"streamline"}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(130,37,'SAM_SERVER','','{"name":"STREAMLINE_SERVER"}','','');
insert into cloudbreak_cuisine.components_blueprints values(131,38,'SAM_GENERAL','{"streamline-common":{"jar.storage.type":"local","streamline.storage.type":"mysql","streamline.storage.connector.connectURI":"jdbc:mysql://localhost:3306/streamline","registry.url":"http://localhost:7788/api/v1","streamline.dashboard.url":"http://localhost:9089","streamline.storage.connector.password":"streamline"}}','','','');
insert into cloudbreak_cuisine.components_blueprints values(132,38,'SAM_SERVER','','{"name":"STREAMLINE_SERVER"}','','');

insert into cloudbreak_cuisine.components_recipes (service_id, recipe_description, extra_type, pre_ambari_start) values(1,'Utills Install','Standard','pas-utilities.sh');
insert into cloudbreak_cuisine.components_recipes (service_id, recipe_description, extra_type, pre_ambari_start) values(2,'Utills Install','Standard','pas-utilities.sh');
insert into cloudbreak_cuisine.components_recipes (service_id, recipe_description, extra_type, pre_ambari_start) values(3,'Utills Install','Standard','pas-utilities.sh');
insert into cloudbreak_cuisine.components_recipes (service_id, recipe_description, extra_type, pre_ambari_start) values(25,'Ranger metastore PG','Standard','pas-ranger.sh');
insert into cloudbreak_cuisine.components_recipes (service_id, recipe_description, extra_type, pre_ambari_start) values(26,'Ranger metastore PG','Standard','pas-ranger.sh');
insert into cloudbreak_cuisine.components_recipes (service_id, recipe_description, extra_type, pre_ambari_start) values(14,'Druid Metastore PG','Standard','pas-druid.sh');
insert into cloudbreak_cuisine.components_recipes (service_id, recipe_description, extra_type, pre_ambari_start) values(15,'Druid Metastore PG','Standard','pas-druid.sh');
insert into cloudbreak_cuisine.components_recipes (service_id, recipe_description, extra_type, pre_ambari_start) values(33,'Registry Metastore MySQL','Standard','pas-registry.sh');
insert into cloudbreak_cuisine.components_recipes (service_id, recipe_description, extra_type, pre_ambari_start) values(34,'Registry Metastore MySQL','Standard','pas-registry.sh');
insert into cloudbreak_cuisine.components_recipes (service_id, recipe_description, extra_type, pre_ambari_start) values(37,'SAM Metastore MySQL','Standard','pas-sam.sh');

insert into cloudbreak_cuisine.management_packs values(1,3,'HDF MPACK FOR HDP+HDF','http://public-repo-1.hortonworks.com/HDF/amazonlinux2/3.x/updates/3.2.0.0/tars/hdf_ambari_mp/hdf-ambari-mpack-3.2.0.0-520.tar.gz');

insert into cloudbreak_cuisine.external_bundles values(1,'Data Science Workshop','Bundle creating a single node HDP cluster with pre-loaded Data Science Workshop Notebooks',0,'https://raw.githubusercontent.com/paulvid/hwx-data-science-workshop/master/HWX_LOGO.png','https://github.com/paulvid/hwx-data-science-workshop.git','https://github.com/paulvid/hwx-data-science-workshop/archive/master.zip');
insert into cloudbreak_cuisine.external_bundles values(2,'Personality Detection','Bundle creating a 3 node HDP & HDF Cluster for personality recognition demo',0,'https://raw.githubusercontent.com/paulvid/perso-detection-demo/master/PERSO_RECOG_DEMO.png','https://github.com/paulvid/perso-detection-demo.git','https://github.com/paulvid/perso-detection-demo/archive/master.zip');
insert into cloudbreak_cuisine.external_bundles values(3,'HCP (Metron) Cluster','Bundle creating a fully kerberized Metron environment',0,'https://raw.githubusercontent.com/josiahg/hwx-hackathon-2018/master/default-recipes/METRON_LOGO.png','https://github.com/simonellistonball/cloudbreak-hcp/archive/master.zip','https://github.com/simonellistonball/cloudbreak-hcp/archive/master.zip');
