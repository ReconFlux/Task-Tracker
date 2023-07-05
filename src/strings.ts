import { ContextInfo } from "gd-sprest-bs";

// Sets the context information
// This is for SPFx or Teams solutions
export const setContext = (context, sourceUrl?: string) => {
    // Set the context
    ContextInfo.setPageContext(context.pageContext);

    // Update the source url
    Strings.SourceUrl = sourceUrl || ContextInfo.webServerRelativeUrl;
}

/**
 * Global Constants
 */
const Strings = {
    AppElementId: "sp-dashboard",
    GlobalVariable: "SPDashboard",
    Lists: {
        Main: "Tasks"
    },
    DocumentLibraries: {
        set1: "Templates",
        set2: "How-Tos"
    },
    ProjectName: "307th MSG Commanders Support Staff",
    subNavigationTitle: "Tracking System Dashboard",
    ProjectDescription: "CSS Issue Tracking tool created for the 307th MSG.",
    SourceUrl: ContextInfo.webServerRelativeUrl,
    DateTimeFormat: "YYYY-MM-DD  HH:mm",
    Version: "0.2"
};
export default Strings;