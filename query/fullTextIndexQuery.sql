drop fulltext index "IQ_ERP_FTI_Entity";
 drop fulltext index "IQ_ERP_FTI_Chat" ;
Create FullText Index "IQ_ERP_FTI_Entity" On "IQERP_Schema"."IQ_ERP.data::metadataModel.Chat" ("ChatContent")
TEXT ANALYSIS ON
TEXT MINING OFF
CONFIGURATION 'LINGANALYSIS_FULL';


Create FullText Index "IQ_ERP_Chat" On "IQERP_Schema"."IQ_ERP.data::metadataModel.ChatAnalysis" ("ChatContent")
TEXT ANALYSIS ON
CONFIGURATION 'IQ_ERP.TAConfig::IQ_ERPConfig.hdbtextconfig';



INSERT INTO "S0014462381"."IQ_ERP.data::Entity" VALUES(
	'SalesOrder'/*EntityCode <VARCHAR(50)>*/,
	'HI!'/*EntityDesc <VARCHAR(255)>*/
);