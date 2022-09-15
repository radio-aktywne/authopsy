const labels = {
  description: "authentication web ui",
  identities: {
    title: "identities · authopsy",
  },
  index: {
    title: "authopsy",
    buttons: {
      invite: "Invite",
      identities: "Identities",
      schemas: "Schemas",
    },
  },
  invite: {
    title: "invite · authopsy",
    buttons: {
      generate: "Generate invite link",
    },
  },
  schemas: {
    title: "schemas · authopsy",
  },
  copy: "Copy",
  copied: "Copied!",
  goBack: "Go back",
  toasts: {
    titles: {
      error: "Error",
      warning: "Warning",
      success: "Success",
    },
  },
};

export type Labels = typeof labels;

export default labels;
