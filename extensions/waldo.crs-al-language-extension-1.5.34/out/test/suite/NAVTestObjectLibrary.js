"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSimpleReportExtensionWithSummaryComments = exports.getReportExtensionWithSuffix = exports.getSimpleReportExtension = exports.getSimpleEntitlement = exports.getSimpleInterface = exports.getPageExtensionWithPrefixAndSuffix = exports.getPageExtensionWithSuffix = exports.getPageExtensionWithPrefix = exports.getObjectWithBracketsInName = exports.getTableWithIntegerPrefixedNames = exports.getPageWithIntegerPrefixedNames = exports.getPageNoPrefixCorrectNameWithActions = exports.getPageWithWaldoPrefixWrongName = exports.getPageFieldNamesWithSpecialCharacters = exports.getTableFieldNamesWithSpecialCharacters = exports.getTableWrongFileNameAndKeyWord = exports.getExtensionObjectWithVeryLongObjectName = exports.getTableExtensionWithSkippingFieldForRename = exports.getTableExtensionWithSuffix = exports.getTableExtension = exports.getTableWithBracketsInFieldName = exports.getTableExtensionWithDecentNameAlready = exports.getTableExtensionWrongFileNameAndKeyWord = exports.getPageCustomizationWrongFileName = exports.getPageExtensionWithLongBaseName = exports.getPageExtensionWithAmpersandInFileName = exports.getPageExtensionWithQuotesInObjectName = exports.getPageExtensionWithWeirdChars = exports.getPageExtensionWithSlashInFileName = exports.getPageExtensionWithWaldoSuffix = exports.getPageExtensionWithWaldoPrefixWithActions = exports.getPageExtensionWrongFileNameWithActions = exports.getAlFileWithoutCode = exports.getTableWithWrongFileName = exports.getTestCodeunitWithPrefix = exports.getTestCodeunit = exports.getNormalCodeunitWithNamespace = exports.getNormalCodeunitWithLongName = exports.getPascalCasedObjectType_Report = exports.getEnumExtensionObject = exports.getEnumObject = exports.getTableWithComments = exports.GetFileNameWithWrongCasing = exports.getTemplateObject = void 0;
class NAVTestObject {
}
function getTemplateObject() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'al.al';
    object.ObjectText = `
    `;
    return object;
}
exports.getTemplateObject = getTemplateObject;
function GetFileNameWithWrongCasing() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'al.Al';
    object.ObjectText = `
    Report 5319465 "SUP Supplier Rating Batch"
    {

    }
    `;
    return object;
}
exports.GetFileNameWithWrongCasing = GetFileNameWithWrongCasing;
function getTableWithComments() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'al.al';
    object.ObjectText = `
    /*
D81 001 00000000B81 AAA 2017.12.26 Some text
*/
table 50901 "Customer Risk"
{
    DataClassification = ToBeClassified;

    fields
    {
        field(1; MyField; Integer)
        {
            DataClassification = ToBeClassified;

        }
    }

    keys
    {
        key(PK; MyField)
        {
            Clustered = true;
        }
    }
}
    `;
    return object;
}
exports.getTableWithComments = getTableWithComments;
function getEnumObject() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'al.al';
    object.ObjectText = `enum 50100 MyEnum
{
    Extensible = true;
    
}`;
    return object;
}
exports.getEnumObject = getEnumObject;
function getEnumExtensionObject() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'al.al';
    object.ObjectText = `enumextension 50100 MyEnumextension extends MyEnum
{

}`;
    return object;
}
exports.getEnumExtensionObject = getEnumExtensionObject;
function getPascalCasedObjectType_Report() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'Pag50100.justAName.al';
    object.ObjectText = `
        Report 5319465 "SUP Supplier Rating Batch"
        {

        }
    `;
    return object;
}
exports.getPascalCasedObjectType_Report = getPascalCasedObjectType_Report;
function getNormalCodeunitWithLongName() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'Cod50100.justAName.al';
    object.ObjectText = `
        codeunit 50100 "Test Overload"
        {
            [EventSubscriber(ObjectType::Codeunit, Codeunit::LogInManagement, 'OnAfterLogInStart', '', false, false)]
            local procedure TestOverLoad()
            var
                Item: Record Item;
            begin
                item.CalculateClassification(true, 'waldo');
            end;
        }
    `;
    return object;
}
exports.getNormalCodeunitWithLongName = getNormalCodeunitWithLongName;
function getNormalCodeunitWithNamespace() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'Cod50100.justAName.al';
    object.ObjectText = `
        namespace spycoclown.test;
        using Microsoft.Inventory.Item;
        codeunit 50100 "Test Overload"
        {
            [EventSubscriber(ObjectType::Codeunit, Codeunit::LogInManagement, 'OnAfterLogInStart', '', false, false)]
            local procedure TestOverLoad()
            var
                Item: Record Item;
            begin
                item.CalculateClassification(true, 'namespace');
            end;
        }
    `;
    return object;
}
exports.getNormalCodeunitWithNamespace = getNormalCodeunitWithNamespace;
function getTestCodeunit() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'Cod50100.justAName.al';
    object.ObjectText = `
        codeunit 50101 TestOverload
        {
            Subtype = Test;

            [Test]
            [HandlerFunctions('HandleMessageFromB')]
            procedure TestOverloadedCalculateClassification()
            var
                Item: Record Item;
            begin
                item.CalculateClassification(false, 'waldo');
            end;

            [MessageHandler]
            procedure HandleMessageFromB(Message: Text[1024])
            begin
                if not Message.Contains('Extension B') then error('wrong message');
            end;
        }
    `;
    return object;
}
exports.getTestCodeunit = getTestCodeunit;
function getTestCodeunitWithPrefix() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'Cod50100.justAName.al';
    object.ObjectText = `
        codeunit 50101 "Vault Management_EVAS"
        {
        
        }
    `;
    return object;
}
exports.getTestCodeunitWithPrefix = getTestCodeunitWithPrefix;
function getTableWithWrongFileName() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'JustSomeTable.al';
    object.ObjectText = `table 50101 JustATestTable
    {
        DataClassification = ToBeClassified;
    
        fields
        {
            field(1; MyField; Integer)
            {
    
                DataClassification = ToBeClassified;
            }
            field(10;MyField2; Integer)
            {
    
                DataClassification = ToBeClassified;
            }
            field(200;"My Field with a weird / Name"; Integer)
            {
    
                DataClassification = ToBeClassified;
            }
    
        }
        keys
        {
            key(PK; MyField)
            {
                Clustered = true;
            }
        }
    
    }
    `;
    return object;
}
exports.getTableWithWrongFileName = getTableWithWrongFileName;
function getAlFileWithoutCode() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'AlFileWithoutCode.al';
    object.ObjectText = `//Only some comments
    `;
    return object;
}
exports.getAlFileWithoutCode = getAlFileWithoutCode;
function getPageExtensionWrongFileNameWithActions() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'SomeFile.al';
    object.ObjectText = `pageextension 50100 "Some Page Ext" extends "Customer List" //22
    {
        layout
        {
            addfirst(Content)
            {
                group(bleh)
                {
                    field("Telex No."; "Telex No.")
                    {
                        ApplicationArea = All;
                    }
                }
                group(two){
                    field("Telex No."; "Telex No.")
                    {
                        ApplicationArea = All;
                    }
                    field("Telex No."; "Telex No.")
                    {
                        ApplicationArea = All;
                    }
                    field(ShortcutDimCode3; ShortcutDimCode[3])
                    {
                        ApplicationArea = Dimensions;
                        CaptionClass = '1,2,3';
                        TableRelation = "Dimension Value".Code WHERE("Global Dimension No." = CONST(3),
                                                                    "Dimension Value Type" = CONST(Standard),
                                                                    Blocked = CONST(false));
                        Visible = DimVisible3;

                        trigger OnValidate()
                        begin
                            ValidateShortcutDimension(3);
                        end;
                    }
                    field(ShortcutDimCode4; ShortcutDimCode[4])
                    {
                        ApplicationArea = Dimensions;
                        CaptionClass = '1,2,4';
                        TableRelation = "Dimension Value".Code WHERE("Global Dimension No." = CONST(4),
                                                                    "Dimension Value Type" = CONST(Standard),
                                                                    Blocked = CONST(false));
                        Visible = DimVisible4;

                        trigger OnValidate()
                        begin
                            ValidateShortcutDimension(4);
                        end;
                    }
                }
            }
        }
    
        actions
        {
            addfirst("&Customer")
            {
                action(SomeAction)
                {
                    RunObject = page "_Empl. Absences by Cat. Matrix";
                }
                action(SomeAction2)
                {
                    RunObject = page "_Empl. Absences by Cat. Matrix";
                }
                action("Some Action 3")
                {
                    RunObject = page "_Empl. Absences by Cat. Matrix";
                }
            }
        }

        trigger OnOpenPage()
        var
            TestCodeunit: Codeunit "Testcodeunit SUFFIX";
        begin
            TestCodeunit.MyProcedureNameEndsWithaction(Rec);
        end;
    }
    `;
    return object;
}
exports.getPageExtensionWrongFileNameWithActions = getPageExtensionWrongFileNameWithActions;
function getPageExtensionWithWaldoPrefixWithActions() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'SomeFile.al';
    object.ObjectText = `pageextension 50100 "waldoSome Page Ext" extends "Customer List" //22
{
    layout
    {
        addfirst(Content)
        {
            field("Telex No."; "Telex No.")
            {
                ApplicationArea = All;
            }
            field("Telex No."; "Telex No.")
            {
                ApplicationArea = All;
            }
            field("Telex No."; "Telex No.")
            {
                ApplicationArea = All;
            }
        }
    }

    actions
    {
        addfirst("&Customer")
        {
            action(waldoSomeAction)
            {
                RunObject = page "_Empl. Absences by Cat. Matrix";
            }
            action(waldoSomeAction2)
            {
                RunObject = page "_Empl. Absences by Cat. Matrix";
            }
            action("waldoSome Action 3")
            {
                RunObject = page "_Empl. Absences by Cat. Matrix";
            }
        }
    }
}
    `;
    return object;
}
exports.getPageExtensionWithWaldoPrefixWithActions = getPageExtensionWithWaldoPrefixWithActions;
function getPageExtensionWithWaldoSuffix() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'SomeFile.al';
    object.ObjectText = `pageextension 50100 "Some Page Extwaldo" extends "Customer List" //22
{
    layout
    {
        addfirst(Content)
        {
            field("Telex No. waldo"; "Telex No.")
            {
                ApplicationArea = All;
            }
            field("Telex No. waldo"; "Telex No.")
            {
                ApplicationArea = All;
            }
            field("Telex No. waldo"; "Telex No.")
            {
                ApplicationArea = All;
            }
        }
    }

    actions
    {
        addfirst("&Customer")
        {
            action(SomeActionwaldo)
            {
                RunObject = page "_Empl. Absences by Cat. Matrix";
            }
            group(someGroupwaldo)
            {
                action(SomeAction2waldo)
                {
                    RunObject = page "_Empl. Absences by Cat. Matrix";
                }
                action("Some Action 3 waldo")
                {
                    RunObject = page "_Empl. Absences by Cat. Matrix";
                }
            }
        }
    }
}
    `;
    return object;
}
exports.getPageExtensionWithWaldoSuffix = getPageExtensionWithWaldoSuffix;
function getPageExtensionWithSlashInFileName() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'Pag50102.justAName.al';
    object.ObjectText = `pageextension 50102 "Salesperson/Ext" extends "Salespersons/Purchasers" //14
    {
        layout
        {
            ////
        }
        
        actions
        {
        }
    }
    `;
    return object;
}
exports.getPageExtensionWithSlashInFileName = getPageExtensionWithSlashInFileName;
function getPageExtensionWithWeirdChars() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'Pag50102.justAName.al';
    object.ObjectText = `pageextension 50102 "S<a>l:es/p\\e|rµ?s*oåäön/Ext" extends "Salespersons/Purchasers" //14
{
    layout
    {
        ////
    }

    actions
    {
    }
}
    `;
    return object;
}
exports.getPageExtensionWithWeirdChars = getPageExtensionWithWeirdChars;
function getPageExtensionWithQuotesInObjectName() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'Pag50102.justANameWithQuotes.al';
    object.ObjectText = `pageextension 50102 "S<a>l:es/p\\e"|rµ?s"*oåäön/Ext" extends "Salespersons/Purchasers" //14
{
    layout
    {
        ////
    }

    actions
    {
    }
}
    `;
    return object;
}
exports.getPageExtensionWithQuotesInObjectName = getPageExtensionWithQuotesInObjectName;
function getPageExtensionWithAmpersandInFileName() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'Pag50102.justAName.al';
    object.ObjectText = `pageextension 50102 "Sales & Purch" extends "Salespersons&Purchasers" //14
    {
        layout
        {
            ////
        }
        
        actions
        {
        }
    }
    `;
    return object;
}
exports.getPageExtensionWithAmpersandInFileName = getPageExtensionWithAmpersandInFileName;
function getPageExtensionWithLongBaseName() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'Pag50102.justAName.al';
    object.ObjectText = `pageextension 50102 "Sales & Purch" extends "VeryLongBaseNameForExtending" //14
    {
        layout
        {
            ////
        }
        
        actions
        {
        }
    }
    `;
    return object;
}
exports.getPageExtensionWithLongBaseName = getPageExtensionWithLongBaseName;
function getPageCustomizationWrongFileName() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'SomePageCustomization.al';
    object.ObjectText = `pagecustomization "SomeCustomizationtherewhere" customizes "Customer Card"
{
    layout
    {
        // Add changes to page layout here
    }
    
    actions
    {
        // Add changes to page actions here
    }
    
    //Variables, procedures and triggers are not allowed on Page Customizations
}
    `;
    return object;
}
exports.getPageCustomizationWrongFileName = getPageCustomizationWrongFileName;
function getTableExtensionWrongFileNameAndKeyWord() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'SomeTableExt.al';
    object.ObjectText = `tableextension 50100 "Just Some Table Extension" extends Customer //18
{
    fields
    {
        // Add changes to table fields here
        field(50100;"Just Some field";Code[10]){
            TableRelation="Just Some Table"."No.";
        }
        field(10;MyField2;     Integer)
        {
            DataClassification = ToBeClassified;
        }
        field(200;"My Field with a weird / Name";Integer)
        {

            DataClassification = ToBeClassified;
        }
        field(114; "Grid"; Boolean) // This is a keyword used as a fieldname
        {
            Caption = 'Grid';
            DataClassification = CustomerContent;
        }
        field(115; "page"; Boolean) // This is a keyword used as a fieldname
        {
            Caption = 'page';
            DataClassification = CustomerContent;
        }
        field(116; "page with (brackets)"; Boolean) 
        {
            Caption = 'page with (brackes)';
            DataClassification = CustomerContent;
        }
    }
    
}
    `;
    return object;
}
exports.getTableExtensionWrongFileNameAndKeyWord = getTableExtensionWrongFileNameAndKeyWord;
function getTableExtensionWithDecentNameAlready() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'SomeTableExt.al';
    object.ObjectText = `tableextension 50100 "Customer Ext 2" extends Customer //18
{
    fields
    {
        
    }
    
}
    `;
    return object;
}
exports.getTableExtensionWithDecentNameAlready = getTableExtensionWithDecentNameAlready;
function getTableWithBracketsInFieldName() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'SomeTableExt.al';
    object.ObjectText = `table 50100 "Prefix2 MyTabl e"
    {
        DataClassification = ToBeClassified;
    
        fields
        {
            field(1; "MyField (LCY)"; Integer)
            {
                Caption = 'MyField';
                DataClassification = ToBeClassified;
            }
    
        }
    
        keys
        {
            key(PK; "MyField")
            {
                Clustered = true;
            }
        }
    
    }
    `;
    return object;
}
exports.getTableWithBracketsInFieldName = getTableWithBracketsInFieldName;
function getTableExtension() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'SomeTableExt.al';
    object.ObjectText = `tableextension 50006 "Prefix Sales Cr.Memo Header" extends "Sales Cr.Memo Header"
    {
        fields
        {
            field(50021; "Prefix Test Field"; Code[20])
            {
                Caption = 'Test Field';
                DataClassification = CustomerContent;
            }        
    }
    `;
    return object;
}
exports.getTableExtension = getTableExtension;
function getTableExtensionWithSuffix() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'SomeTableExt.al';
    object.ObjectText = `tableextension 50006 "Sales Cr.Memo Header waldo" extends "Sales Cr.Memo Header"
    {
        fields
        {
            field(50021; "Test Fieldwaldo "; Code[20])
            {
                Caption = 'Test Field';
                DataClassification = CustomerContent;
            }        
    }
    `;
    return object;
}
exports.getTableExtensionWithSuffix = getTableExtensionWithSuffix;
function getTableExtensionWithSkippingFieldForRename() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'SomeTableExt.al';
    object.ObjectText = `tableextension 50100 "Just Some Table Extension" extends Customer //18
{
    fields
    {
        //crs-al disable
        field(50100;"Just Some field";Code[10]){
            TableRelation="Just Some Table"."No.";
        }
        //crs-al enable
        field(10;MyField2;     Integer)
        {
            DataClassification = ToBeClassified;
        }
    }
    
}
    `;
    return object;
}
exports.getTableExtensionWithSkippingFieldForRename = getTableExtensionWithSkippingFieldForRename;
function getExtensionObjectWithVeryLongObjectName() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'bleh.al';
    object.ObjectText = `pageextension 2036789 "BlankPurchOrderSubfrm Ext BASE" extends "Blanket Purchase Order Subform" //510
    {
    
        layout
        {
            addlast(Control1)
            {
                field("VMF Status Icon"; "VMF Status Icon")
                {
                    ApplicationArea = All;
                    Visible = GlobalShowVMFStatusIcon;
                }
            }
        }
    
        actions
        {
            addlast("&Line")
            {
                action(ActionShowVMFMessages)
                {
                    Image = ErrorLog;
                    Caption = 'Show VMF Messages';
                    Visible = GlobalVMFIsEnabled;
                    ApplicationArea = All;
                    trigger OnAction()
                    begin
                        ShowVMFMessages();
                    end;
                }
            }
        }
        var
            GlobalShowVMFStatusIcon: Boolean;
            GlobalVMFIsEnabled: Boolean;
    
        trigger OnOpenPage()
        var
            VMFClass: Codeunit "VMF Class";
        begin
            GlobalShowVMFStatusIcon := VMFClass.IsVMFStatusIconEnabledForPurchase();
            GlobalVMFIsEnabled := VMFClass.IsVMFEnabled();
        end;
    
        trigger OnAfterGetRecord()
        begin
            if GlobalShowVMFStatusIcon then
                VMFUpdateStatusIcon();
        end;
    
        trigger OnModifyRecord(): Boolean
        begin
            if GlobalShowVMFStatusIcon then
                VMFUpdateStatusIcon();
        end;
    }
    `;
    return object;
}
exports.getExtensionObjectWithVeryLongObjectName = getExtensionObjectWithVeryLongObjectName;
function getTableWrongFileNameAndKeyWord() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'SomeTableExt.al';
    object.ObjectText = `table 50102 "Sales&Receivables"
    {
        DataClassification = CustomerContent;
    
        fields
        {
            field(1; MyField; Integer)
            {
                ObsoleteState = Pending;
                DataClassification = CustomerContent;
            }
            field(114; "Grid"; Boolean) // This is a keyword used as a fieldname
            {
                Caption = 'Grid';
                DataClassification = CustomerContent;
            }
            field(115; "page"; Boolean) // This is a keyword used as a fieldname
            {
                Caption = 'page';
                DataClassification = CustomerContent;
            }
    
        }
    
        keys
        {
            key(PK; "MyField")
            {
                Clustered = true;
            }
        }
    
    }
    `;
    return object;
}
exports.getTableWrongFileNameAndKeyWord = getTableWrongFileNameAndKeyWord;
function getTableFieldNamesWithSpecialCharacters() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'JustATestTable.al';
    object.ObjectText = `table 50102 JustATestTable
    {
        DataClassification = CustomerContent;
    
        fields
        {
            field(1; MyField; Integer)
            {
                DataClassification = CustomerContent;
            }
            field(123; "Unit Cost (LCY)"; Decimal)
            {
                Caption = 'Unit Cost (LCY)';
                DataClassification = CustomerContent;
            }
            field(321; "VAT %"; Decimal)
            {
                Caption = 'VAT %';
                DataClassification = CustomerContent;
            }
            field(402; "Cost is Posted to G/L (Cost is Posted to G/L)"; Boolean)
            {
                Caption = 'Cost is Posted to G/L (Cost is Posted to G/L)';
                DataClassification = CustomerContent;
            }
        }

        keys
        {
            key(PK; "MyField")
            {
                Clustered = true;
            }
        }
    }
    `;
    return object;
}
exports.getTableFieldNamesWithSpecialCharacters = getTableFieldNamesWithSpecialCharacters;
function getPageFieldNamesWithSpecialCharacters() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'JustATestPage.al';
    object.ObjectText = `page 50102 JustATestPage
    {
        layout
        {
            area(content)
            {
                repeater(General)
                {
                    field(MyField; Integer)
                    {
                    }
                    field("Unit Cost (LCY)"; Decimal)
                    {
                        Caption = 'Unit Cost (LCY)';
                    }
                    field("VAT %"; Decimal)
                    {
                        Caption = 'VAT %';
                    }
                    field("Cost is Posted to G/L (Cost is Posted to G/L)"; Boolean)
                    {
                        Caption = 'Cost is Posted to G/L (Cost is Posted to G/L)';
                    }
                }
            }
        }
    }
    `;
    return object;
}
exports.getPageFieldNamesWithSpecialCharacters = getPageFieldNamesWithSpecialCharacters;
function getPageWithWaldoPrefixWrongName() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'SomeName.al';
    object.ObjectText = `page 50100 "waldo weird name with/slash"
    {
        PageType = Card;
        SourceTable = test;

        layout
        {
            area(content)
            {
                group(GroupName)
                {
                    field(Name; NameSource)
                    {
                        ApplicationArea = All;

                    }
                }
            }
        }

        actions
        {
            area(processing)
            {
                action(waldoActionName)
                {
                    ApplicationArea = All;

                    trigger OnAction()
                    begin

                    end;
                }
                action(waldoActionName2)
                {
                    ApplicationArea = All;

                    trigger OnAction()
                    begin

                    end;
                }
                action("waldoAction Name 3")
                {
                    ApplicationArea = All;

                    trigger OnAction()
                    begin

                    end;
                }
            }
        }

        local procedure ShowSourceDocOrTransaction(pbolShowSourceDocument: Boolean)
        var
            lrecRegisteredTrans: Record "NVT WMS Registered Transaction";
            liCounter: Integer;
            liTypes: Integer;
            liPossibleTypes: array[10] of Integer;
        begin
            ShowSourceDocOrTransaction(false); 
            CheckTransaction(true)
        end;
        
        var
            myInt: Integer;
    }
    `;
    return object;
}
exports.getPageWithWaldoPrefixWrongName = getPageWithWaldoPrefixWrongName;
function getPageNoPrefixCorrectNameWithActions() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'justAName.Page.al';
    object.ObjectText = `page 50100 justAName
    {
        PageType = Card;
        SourceTable = test;

        layout
        {
            area(content)
            {
                group(GroupName)
                {
                    field(Name; NameSource)
                    {
                        ApplicationArea = All;

                    }
                }
            }
        }

        actions
        {
            area(processing)
            {
                action(ActionName)
                {
                    ApplicationArea = All;

                    trigger OnAction()
                    begin

                    end;
                }
                action(ActionName2)
                {
                    ApplicationArea = All;

                    trigger OnAction()
                    begin

                    end;
                }
                action("Action Name 3")
                {
                    ApplicationArea = All;

                    trigger OnAction()
                    begin

                    end;
                }
            }
        }

        var
            myInt: Integer;
    }`;
    return object;
}
exports.getPageNoPrefixCorrectNameWithActions = getPageNoPrefixCorrectNameWithActions;
function getPageWithIntegerPrefixedNames() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'FieldsWithIntegers.Page.al';
    object.ObjectText = `page 50104 FieldsWithIntegers
    {
        PageType = Card;
        SourceTable = test;

        layout
        {
            area(content)
            {
                group(GroupName)
                {
                    field(Field1; RandomSource)
                    {
                        ApplicationArea = All;
                    }
                    field(2Field; RandomSource)
                    {
                        ApplicationArea = All;
                    }
                }
            }
        }

        actions
        {
            area(processing)
            {
                action(Action1)
                {
                    ApplicationArea = All;

                    trigger OnAction()
                    begin
                    end;
                }
                action(2Action)
                {
                    ApplicationArea = All;

                    trigger OnAction()
                    begin
                    end;
                }
            }
        }
    }`;
    return object;
}
exports.getPageWithIntegerPrefixedNames = getPageWithIntegerPrefixedNames;
function getTableWithIntegerPrefixedNames() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'FieldsWithIntegers.Page.al';
    object.ObjectText = `table 50104 FieldsWithIntegers
    {
        DataClassification = ToBeClassified;

        fields
        {
            field(1; MyField; Integer)
            {
            }
            field(2; "2Field"; Integer)
            {
            }
            field(3; "With (Parenthesis)"; Decimal)
            {
            }
        }

        keys
        {
            key(PK; MyField)
            {
                Clustered = true;
            }
        }
    }`;
    return object;
}
exports.getTableWithIntegerPrefixedNames = getTableWithIntegerPrefixedNames;
function getObjectWithBracketsInName() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'Cod50177.SomeNameWithBrackets.al';
    object.ObjectText = `codeunit 50117 "Some Name (with brackets)"
{
    
}
    `;
    return object;
}
exports.getObjectWithBracketsInName = getObjectWithBracketsInName;
function getPageExtensionWithPrefix() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'Pag50102.CRSSalesperson.al';
    object.ObjectText = `pageextension 50102 "CRS Salespersons/Purchasers" extends "Salespersons/Purchasers" //14
{
    layout
    {
        ////
    }

    actions
    {
    }
}
    `;
    return object;
}
exports.getPageExtensionWithPrefix = getPageExtensionWithPrefix;
function getPageExtensionWithSuffix() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'Pag50102.CRSSalesperson.al';
    object.ObjectText = `pageextension 50102 "Salespersons/Purchasers CRS" extends "Salespersons/Purchasers" //14
{
    layout
    {
        ////
    }

    actions
    {
    }
}
    `;
    return object;
}
exports.getPageExtensionWithSuffix = getPageExtensionWithSuffix;
function getPageExtensionWithPrefixAndSuffix() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'Pag50102.CRSSalesperson.al';
    object.ObjectText = `pageextension 50102 "PCRS Salespersons/Purchasers SCRS" extends "Salespersons/Purchasers" //14
{
    layout
    {
        ////
    }

    actions
    {
    }
}
    `;
    return object;
}
exports.getPageExtensionWithPrefixAndSuffix = getPageExtensionWithPrefixAndSuffix;
function getSimpleInterface() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'SomeInterface.al';
    object.ObjectText = `interface "IBallColorIdentifier"
    {
        procedure GetBallColor(): Text;
    }
    `;
    return object;
}
exports.getSimpleInterface = getSimpleInterface;
function getSimpleEntitlement() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'SomeEntitlement.al';
    object.ObjectText = `entitlement "The Entitlement"
    {
        Id = '62e90394-69f5-4237-9190-012177145e10';
        ObjectEntitlements = "The PermissionSet";
        RoleType = Local;
        Type = Role;    
    }
`;
    return object;
}
exports.getSimpleEntitlement = getSimpleEntitlement;
function getSimpleReportExtension() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'getSimpleReportExtension.al';
    object.ObjectText = `reportextension 50100 "Customer Top 10 List Ext" extends "Customer - Top 10 List"
    {
        dataset
        {
            add(Header)
            {
                column(APO_YourReference; YourReference)
                {
    
                }
                column(APO_YourReference2; YourReference)
                {
    
                }
                column(APO_YourReference3; YourReference)
                {
    
                }
                column(APO_YourReference4; CustomerAddr[1])
                {
    
                }
                column(APO_YourReference5; CustomerAddr[10])
                {
    
            }
        }
    
        requestpage
        {
            layout
            {
                addfirst(Somewhere)
                {
                    field(Name; Expression)
                    {
                        Caption = 'This Field';
                    }
                }
    
            }
        }
        var
            YourReference: Text[35];
    }
    `;
    return object;
}
exports.getSimpleReportExtension = getSimpleReportExtension;
function getReportExtensionWithSuffix() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'getSimpleReportExtension.al';
    object.ObjectText = `reportextension 50100 "Customer Top 10 List Ext" extends "Customer - Top 10 List"
    {
        dataset
        {
            add(Header)
            {
                column(APO_YourReferencewaldo; YourReference)
                {
    
                }
                column(APO_YourReference2waldo; YourReference)
                {
    
                }
                column(APO_YourReference3waldo; YourReference)
                {
    
                }
                column(APO_YourReference4waldo; CustomerAddr[1])
                {
    
                }
                column(APO_YourReference5waldo; CustomerAddr[10])
                {
    
            }
        }
    
        var
            YourReference: Text[35];
    }
    `;
    return object;
}
exports.getReportExtensionWithSuffix = getReportExtensionWithSuffix;
function getSimpleReportExtensionWithSummaryComments() {
    let object = new NAVTestObject;
    object.ObjectFileName = 'getSimpleReportExtension.al';
    object.ObjectText = `
    /// <summary>
    /// Interface "bleh"
    /// </summary>
    reportextension 50100 "Customer Top 10 List Ext" extends "Customer - Top 10 List"
    {
        dataset
        {
            // Add changes to dataitems and columns here
        }
    
        requestpage
        {
            // Add changes to the requestpage here
        }
    }
    `;
    return object;
}
exports.getSimpleReportExtensionWithSummaryComments = getSimpleReportExtensionWithSummaryComments;
//# sourceMappingURL=NAVTestObjectLibrary.js.map