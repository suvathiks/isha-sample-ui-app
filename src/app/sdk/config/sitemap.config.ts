export const homeLink: Link = {
  label: "Home",
  path: "/",
  icon: "home",
  children: []
};

export const sitemap: Link[] = [
  {
    label: "Masters",
    path: null,
    icon: "list",
    children: [
      {
        label: "Programs",
        path: "/programs",
        icon: "list",
        children: [
          {
            label: "Add Program",
            path: "/programs/add-edit",
            icon: "add_box",
            children: []
          }
        ]
      },
      {
        label: "Contacts",
        path: "/contacts",
        icon: "list",
        children: []
      },
      {
        label: "Notes",
        path: "/notes",
        icon: "list",
        children: []
      },
      {
        label: "Registrations",
        path: "/registrations",
        icon: "list",
        children: []
      },
      {
        label: "Bays",
        path: "/bays",
        icon: "list",
        children: []
      },
      {
        label: "Feedback Periods",
        path: "/feedback-periods",
        icon: "list",
        children: []
      },
      {
        label: "Note Groups",
        path: "/note-groups",
        icon: "list",
        children: []
      },
      {
        label: "Trainee Groups",
        path: "/trainee-groups",
        icon: "list",
        children: []
      },
      {
        label: "Constant Types",
        path: "/constant-types",
        icon: "list",
        children: []
      }
    ]
  },
  {
    label: "Note Transactions",
    path: null,
    icon: "library_books",
    children: [
      {
        path: "/issued-notes",
        label: "Issued Notes",
        icon: "library_books",
        children: []
      },
      {
        path: "/bulk-issued",
        label: "Bulk Issued Notes",
        icon: "library_books",
        children: []
      },
      {
        path: "/received-notes",
        label: "Received Notes",
        icon: "library_books",
        children: []
      }
    ]
  },
  {
    label: "Assessments",
    path: null,
    icon: "assessment",
    children: [
      {
        path: "/recitations",
        label: "Recitations",
        icon: "assessment",
        children: []
      },
      {
        path: "/chants",
        label: "Chants",
        icon: "assessment",
        children: []
      },
      {
        path: "/pa",
        label: "PA",
        icon: "assessment",
        children: []
      },
      {
        path: "/feedback",
        label: "Feedback",
        icon: "assessment",
        children: []
      }
    ]
  },
  {
    label: "Reports",
    path: null,
    icon: "assignment",
    children: [
      {
        path: "/trainees-report",
        label: "Trainees by Program Report",
        icon: "assignment",
        children: []
      },
      {
        path: "/teachers-report",
        label: "Teachers Report",
        icon: "assignment",
        children: []
      },
      {
        path: "/notes-issued-report",
        label: "Notes Issued - Note Report",
        icon: "assignment",
        children: []
      },
      {
        path: "/output-recitation",
        label: "Output Recitation Report",
        icon: "assignment",
        children: []
      },
      {
        path: "/chants-report",
        label: "Chant - Summary Report",
        icon: "assignment",
        children: []
      }
    ]
  }
];

export class Link {
  label: string = "";
  path: string = "";
  icon: string = "";
  children: Link[] = [];
}
