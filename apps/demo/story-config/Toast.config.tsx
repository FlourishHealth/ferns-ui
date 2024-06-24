import {DemoConfiguration} from "@config";
import {ToastDemo, Toasts} from "@stories";
import {Toast} from "ferns-ui";

export const ToastConfiguration: DemoConfiguration = {
  name: "Toast",
  component: Toast, // Replace with actual component reference
  related: ["Banners"],
  description:
    "Toasts are brief and small messages that overlay content, but do not block the user’s flow, as they are out of the way and ephemeral. Toasts do not require user action and primarily acknowledge that a user has performed an action or completed a task. Also known as 'snackbar'.",
  shortDescription:
    "Toasts are brief and small messages that overlay content, but do not block the user’s flow, as they are out of the way and ephemeral.",
  a11yNotes: ["Toasts should be on the screen for a minimum of 5 seconds."],
  category: "Component",
  status: {
    documentation: "ready",
    figma: "ready",
    figmaLink:
      "https://www.figma.com/file/ykXj5qjjtFjOYkAvTasu9r/Flourish-Health-Design-System?type=design&node-id=656%3A23406&mode=design&t=IZ8oGBzUmBzUtZMr-1",
    ios: "ready",
    android: "ready",
    web: "ready",
  },
  additionalDocumentation: [{name: "NN/g article", link: "https://www.nngroup.com/articles/"}],
  interfaceName: "ToasterProps",
  usage: {
    do: [
      "Use a toaster when you want to briefly acknowledge a users action without interrupting their flow.",
      "Acknowledge an action that relates to another surface, providing a link that navigates the user to that surface.",
      "Provide a way to undo actions.",
      "Provide quick information on system processes.",
    ],
    doNot: [
      "Do not use a toaster if there is a crucial error that’s blocking the flow; consider using error messages, modals, or banners instead.",
      "For confirmation on an action; consider a modal instead.",
      "For upsells, FYIs, or promotional content; consider a banner instead.",
      "To guide or educate the user.",
    ],
  },
  props: {},
  demo: ToastDemo,
  demoOptions: {},
  stories: {
    Toasts: {render: Toasts},
  },
};
