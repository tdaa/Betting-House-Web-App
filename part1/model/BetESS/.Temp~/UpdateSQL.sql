-- Group [Group]
create table `group` (
   `oid`  integer  not null,
   `groupname`  varchar(255),
  primary key (`oid`)
);


-- Module [Module]
create table `module` (
   `oid`  integer  not null,
   `moduleid`  varchar(255),
   `modulename`  varchar(255),
  primary key (`oid`)
);


-- User [User]
create table `user` (
   `oid`  integer  not null,
   `username`  varchar(255),
   `password`  varchar(255),
   `email`  varchar(255),
  primary key (`oid`)
);


-- Admin [ent1]
create table `admin` (
   `email`  varchar(255)  not null,
   `password`  varchar(255),
  primary key (`email`)
);


-- UtilizadorNormal [ent2]
create table `utilizadornormal` (
   `nome`  varchar(255),
   `esscoins`  double precision
);


-- Utilizador [ent3]
create table `utilizador` (
   `idutilizador`  integer  not null,
   `email`  varchar(255),
   `password`  varchar(255),
   `nome`  varchar(255),
   `tipo`  varchar(255),
  primary key (`idutilizador`)
);


-- UtilizadorPremium [ent4]
create table `utilizadorpremium` (
   `valorpago`  double precision,
   `esscoins`  double precision
);


-- Aposta [ent5]
create table `aposta` (
   `idaposta`  integer  not null,
   `valor`  double precision,
   `estado`  varchar(255),
  primary key (`idaposta`)
);


-- Evento [ent7]
create table `evento` (
   `idevento`  integer  not null,
   `estado`  varchar(255),
   `resultado`  varchar(255),
   `tipo`  varchar(255),
   `diahora`  date,
  primary key (`idevento`)
);


-- Resultado [ent8]
create table `resultado` (
   `idresultado`  integer  not null,
   `designacao`  varchar(255),
  primary key (`idresultado`)
);


-- Odd [ent9]
create table `odd` (
   `idodd`  integer  not null,
   `valor`  double precision,
  primary key (`idodd`)
);


-- Group_DefaultModule [Group2DefaultModule_DefaultModule2Group]
alter table `group`  add column  `module_oid`  integer;
alter table `group`   add index fk_group_module (`module_oid`), add constraint fk_group_module foreign key (`module_oid`) references `module` (`oid`);


-- Group_Module [Group2Module_Module2Group]
create table `group_module` (
   `group_oid`  integer not null,
   `module_oid`  integer not null,
  primary key (`group_oid`, `module_oid`)
);
alter table `group_module`   add index fk_group_module_group (`group_oid`), add constraint fk_group_module_group foreign key (`group_oid`) references `group` (`oid`);
alter table `group_module`   add index fk_group_module_module (`module_oid`), add constraint fk_group_module_module foreign key (`module_oid`) references `module` (`oid`);


-- User_DefaultGroup [User2DefaultGroup_DefaultGroup2User]
alter table `user`  add column  `group_oid`  integer;
alter table `user`   add index fk_user_group (`group_oid`), add constraint fk_user_group foreign key (`group_oid`) references `group` (`oid`);


-- User_Group [User2Group_Group2User]
create table `user_group` (
   `user_oid`  integer not null,
   `group_oid`  integer not null,
  primary key (`user_oid`, `group_oid`)
);
alter table `user_group`   add index fk_user_group_user (`user_oid`), add constraint fk_user_group_user foreign key (`user_oid`) references `user` (`oid`);
alter table `user_group`   add index fk_user_group_group (`group_oid`), add constraint fk_user_group_group foreign key (`group_oid`) references `group` (`oid`);


-- Evento_Resultado [rel1]
create table `evento_resultado` (
   `evento_idevento`  integer not null,
   `resultado_idresultado`  integer not null,
  primary key (`evento_idevento`, `resultado_idresultado`)
);
alter table `evento_resultado`   add index fk_evento_resultado_evento (`evento_idevento`), add constraint fk_evento_resultado_evento foreign key (`evento_idevento`) references `evento` (`idevento`);
alter table `evento_resultado`   add index fk_evento_resultado_resultado (`resultado_idresultado`), add constraint fk_evento_resultado_resultado foreign key (`resultado_idresultado`) references `resultado` (`idresultado`);


-- Utilizador_UtilizadorNormal [rel2]
alter table `utilizadornormal`  add column  `utilizador_idutilizador`  integer;
alter table `utilizadornormal`   add index fk_utilizadornormal_utilizador (`utilizador_idutilizador`), add constraint fk_utilizadornormal_utilizador foreign key (`utilizador_idutilizador`) references `utilizador` (`idutilizador`);


-- Utilizador_UtilizadorPremium [rel3]
alter table `utilizadorpremium`  add column  `utilizador_idutilizador`  integer;
alter table `utilizadorpremium`   add index fk_utilizadorpremium_utilizado (`utilizador_idutilizador`), add constraint fk_utilizadorpremium_utilizado foreign key (`utilizador_idutilizador`) references `utilizador` (`idutilizador`);


-- Aposta_Evento [rel4]
create table `aposta_evento` (
   `aposta_idaposta`  integer not null,
   `evento_idevento`  integer not null,
  primary key (`aposta_idaposta`, `evento_idevento`)
);
alter table `aposta_evento`   add index fk_aposta_evento_aposta (`aposta_idaposta`), add constraint fk_aposta_evento_aposta foreign key (`aposta_idaposta`) references `aposta` (`idaposta`);
alter table `aposta_evento`   add index fk_aposta_evento_evento (`evento_idevento`), add constraint fk_aposta_evento_evento foreign key (`evento_idevento`) references `evento` (`idevento`);


-- Utilizador_Aposta [rel5]
alter table `utilizador`  add column  `aposta_idaposta`  integer;
alter table `utilizador`   add index fk_utilizador_aposta (`aposta_idaposta`), add constraint fk_utilizador_aposta foreign key (`aposta_idaposta`) references `aposta` (`idaposta`);


-- Odd_Resultado [rel6]
alter table `odd`  add column  `resultado_idresultado`  integer;
alter table `odd`   add index fk_odd_resultado (`resultado_idresultado`), add constraint fk_odd_resultado foreign key (`resultado_idresultado`) references `resultado` (`idresultado`);


