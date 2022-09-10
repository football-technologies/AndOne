const scheme = {
  // users/xxxxx
  users: {
    id: null,
    status: 1,
    authId: null,
    userType: 10,
    displayName: null,
    screenName: null,
    description: null,
    icon: null,
    shop: {
      id: null,
      ref: null,
    },
    createdAt: null,
    updatedAt: null,
  },

  // users/xxxxx/secrets/xxxxx
  secrets: {
    id: null,
    status: 1,
    email: null,
    address: null,
    createdAt: null,
    updatedAt: null,
  },

  // users/xxxxx/bids/xxxxx
  // bids: {
  //   id: null,
  //   status: 1,
  //   price: null,
  //   user: {
  //     id: null,
  //     ref: null,
  //     name: null,
  //     icon: null,
  //   },
  //   item: {
  //     id: null,
  //     ref: null,
  //     name: null,
  //   },
  //   shop: {
  //     id: null,
  //     ref: null,
  //     name: null,
  //   },
  //   createdAt: null,
  //   updatedAt: null,
  // },

  // users/xxxxx/collections/xxxxx
  // collections: {
  //   id: null,
  //   status: 1,
  //   price: 0,
  //   user: {
  //     id: null,
  //     ref: null,
  //     name: null,
  //   },
  //   item: {
  //     id: null,
  //     ref: null,
  //     name: null,
  //   },
  //   shop: {
  //     id: null,
  //     ref: null,
  //     name: null,
  //   },
  //   createdAt: null,
  //   updatedAt: null,
  // },

  // users/xxxxx/likes
  likes: {
    id: null,
    status: 1,
    likeType: 1,
    item: {
      id: null,
      ref: null,
      name: null,
    },
    shop: {
      id: null,
      ref: null,
      name: null,
    },
    user: {
      id: null,
      ref: null,
      name: null,
      icon: null,
    },
    createdAt: null,
    updatedAt: null,
  },

  // items/xxxxx
  items: {
    id: null,
    status: 1,
    itemStatus: 1,
    name: null,
    description: null,
    images: [], // {caption, url}
    tags: [], // {id, ref, name}
    // artist: {
    //   id: null,
    //   ref: null,
    //   name: null,
    //   icon: null,
    // },
    shop: {
      id: null,
      ref: null,
      name: null,
      icon: null,
    },
    createdYear: null,
    links: [], // {caption, url}
    sale: {
      startPrice: 0,
      floorPrice: 0,
      startedAt: null,
      finishedAt: null,
      permitType: 1,
    },
    sold: {
      user: {
        id: null,
        ref: null,
        name: null,
        icon: null,
      },
      price: null,
      soldAt: null,
    },
    createdAt: null,
    updatedAt: null,
  },

  // items/xxxxx/biddings/xxxxx
  biddings: {
    id: null,
    status: 1,
    price: null,
    item: {
      id: null,
      ref: null,
      name: null,
    },
    shop: {
      id: null,
      ref: null,
      name: null,
    },
    user: {
      id: null,
      ref: null,
      name: null,
      icon: null,
    },
    createdAt: null,
    updatedAt: null,
  },

  // items/xxxxx/comments/xxxxx
  comments: {
    id: null,
    text: null,
    status: 1,
    commentStatus: 1,
    item: {
      id: null,
      ref: null,
      name: null,
    },
    user: {
      id: null,
      ref: null,
      name: null,
      icon: null,
    },
    parent: {
      id: null,
      ref: null,
    },
    createdAt: null,
    updatedAt: null,
  },

  // items/xxxxx/ratings/xxxx
  ratings: {
    id: null,
    status: 1,
    rate: null,
    item: {
      id: null,
      ref: null,
      name: null,
    },
    user: {
      id: null,
      ref: null,
      name: null,
      icon: null,
    },
    createdAt: null,
    updatedAt: null,
  },

  // shops/xxxxx
  shops: {
    id: null,
    status: 1,
    name: null,
    description: null,
    address: null,
    phone: null,
    openHour: null,
    holidays: null,
    icon: null,
    cover: null,
    links: {
      homepage: null,
      blogs: null,
      twitter: null,
      facebook: null,
      instagram: null,
      tiktok: null,
      others: null,
    },
    delegate: null,
    images: [], // {caption, url}
    tags: [], // {id, ref, name}
    counts: {
      items: 0,
      ratings: 0,
      likes: 0,
    },
    createdAt: null,
    updatedAt: null,
  },

  // tags/xxxxx
  tags: {
    id: null,
    status: 1,
    name: null,
    createdAt: null,
    updatedAt: null,
  },

  // artists/xxxxx
  // artists: {
  //   id: null,
  //   status: 1,
  //   name: null,
  //   icon: null,
  //   description: null,
  //   birthAt: null,
  //   country: [], // e.g. 日本、メキシコ、イタリア
  //   links: [], // {caption, url}
  //   shop: {
  //     id: null,
  //     ref: null,
  //     name: null,
  //   },
  //   createdAt: null,
  //   updatedAt: null,
  // },

  // contacts/xxxxx
  contacts: {
    id: null,
    status: 1,
    name: null,
    email: null,
    text: null,
    user: {
      id: null,
      ref: null,
      name: null,
      icon: null,
    },
    createdAt: null,
    updatedAt: null,
  },
};
export default scheme;
