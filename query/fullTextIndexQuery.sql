-- drop fulltext index "iERP_FTI_Entity" ;
-- drop fulltext index "iERP_FTI_ChatConfig" ;
Create FullText Index "iERP_FTI_Entity" On "S0014462381"."IQ_ERP.data::Entity" ("EntityDesc")
TEXT ANALYSIS ON
TEXT MINING OFF
CONFIGURATION 'LINGANALYSIS_FULL';


Create FullText Index "iERP_FTI_ChatConfig" On "S0014462381"."IQ_ERP.data::Chat" ("ChatContent")
TEXT ANALYSIS ON
TEXT MINING OFF
CONFIGURATION 'iERP.TAConfig::iERPConfig.hdbtextconfig';


INSERT INTO "S0014462381"."IQ_ERP.data::Entity" VALUES(
	'SalesOrder'/*EntityCode <VARCHAR(50)>*/,
	'HI!'/*EntityDesc <VARCHAR(255)>*/
);