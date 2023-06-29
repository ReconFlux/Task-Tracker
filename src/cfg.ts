import { Helper, SPTypes } from "gd-sprest-bs";
import Strings from "./strings";

/**
 * SharePoint Assets
 */
export const Configuration = Helper.SPConfig({
    ListCfg: [
        {
            ListInformation: {
                Title: Strings.Lists.Main,
                BaseTemplate: SPTypes.ListTemplateType.GenericList
            },
            TitleFieldRequired: false,
            TitleFieldDisplayName: "  ",
            TitleFieldDefaultValue: " ",
            CustomFields: [
                {
                    name: "AssignedTo",
                    title: "Assigned To",
                    type: Helper.SPCfgFieldType.User,
                    required: true,
                    selectionMode: SPTypes.FieldUserSelectionType.PeopleOnly,
                } as Helper.IFieldInfoUser,
                {
                    name: "Requester",
                    title: "Requester",
                    type: Helper.SPCfgFieldType.User,
                    required: true,
                    selectionMode: SPTypes.FieldUserSelectionType.PeopleOnly,
                } as Helper.IFieldInfoUser,
                {
                    name: "ItemType",
                    title: "Item Type",
                    type: Helper.SPCfgFieldType.Choice,
                    defaultValue: "Type 3",
                    required: true,
                    choices: [
                        "Type 1", "Type 2", "Type 3", "Type 4", "Type 5"
                    ]
                } as Helper.IFieldInfoChoice,
                {
                    name: "Comments",
                    title: "Comments",
                    type: Helper.SPCfgFieldType.Note,
                    noteType: SPTypes.FieldNoteType.TextOnly
                } as Helper.IFieldInfoNote,
                {
                    name: "Status",
                    title: "Status",
                    type: Helper.SPCfgFieldType.Choice,
                    defaultValue: "Draft",
                    required: true,
                    showInNewForm: false,
                    choices: [
                        "Draft", "Submitted", "Rejected", "Pending Approval",
                        "Approved", "Archived"
                    ]
                }
            ],
            ViewInformation: [
                {
                    ViewName: "All Items",
                    ViewFields: [
                        "LinkTitle", "ItemType", "Status", "AssignedTo", "Requester", "Comments"
                    ]
                }
            ]
        },
        // Templates Library
        {
            ListInformation: {
                Title: Strings.DocumentLibraries.set1,
                BaseTemplate: SPTypes.ListTemplateType.DocumentLibrary
            }
        },
        // How Tos Library
        {
            ListInformation: {
                Title: Strings.DocumentLibraries.set2,
                BaseTemplate: SPTypes.ListTemplateType.DocumentLibrary
            }
        }
    ]
});