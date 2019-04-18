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
   `email`  varchar(255)  not null,
   `password`  varchar(255),
   `nome`  varchar(255),
   `tipo`  varchar(255),
  primary key (`email`)
);


-- Admin [ent1]
create table `admin` (
   `email`  varchar(255)  not null,
   `password`  varchar(255),
  primary key (`email`)
);


-- Utilizador [ent2]
create table `utilizador` (
   `email`  varchar(255)  not null,
   `password`  varchar(255),
   `nome`  varchar(255),
   `tipo`  varchar(255),
   `esscoins`  double precision,
   `valorpago`  varchar(255),
   `ispremium`  integer,
  primary key (`email`)
);


-- Aposta [ent5]
create table `aposta` (
   `idaposta`  integer  not null,
   `valor`  double precision,
   `estado`  varchar(255),
   `utilizador_email`  varchar(255),
   `evento_idevento`  integer,
   `evento_resultado`  integer,
  primary key (`idaposta`)
);


-- Evento [ent7]
create table `evento` (
   `idevento`  integer  not null,
   `estado`  integer,
   `diahora`  date,
   `categoria`  varchar(255),
   `equipa1`  varchar(255),
   `equipa2`  varchar(255),
   `odd1`  double precision,
   `odd2`  double precision,
   `oddempate`  double precision,
   `resultado`  integer,
  primary key (`idevento`)
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
   `user_oid`  varchar(255) not null,
   `group_oid`  integer not null,
  primary key (`user_oid`, `group_oid`)
);
alter table `user_group`   add index fk_user_group_user (`user_oid`), add constraint fk_user_group_user foreign key (`user_oid`) references `user` (`email`);
alter table `user_group`   add index fk_user_group_group (`group_oid`), add constraint fk_user_group_group foreign key (`group_oid`) references `group` (`oid`);


