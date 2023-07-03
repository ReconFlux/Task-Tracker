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
    ProjectName: "Task Tracking Dashboard",
    ProjectDescription: "Created using the gd-sprest-bs library.",
    SourceUrl: ContextInfo.webServerRelativeUrl,
    DateTimeFormat: "YYYY-MM-DD  HH:mm",
    Version: "0.2"
};
export default Strings;