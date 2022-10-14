export function filterNweetsByUid({ data, uid }) {
//   const nweets = Object.entries(data).filter((nweet) => {
//     const [, { creatorId }] = nweet;

  //     return uid === creatorId;
  //   }).map((nweet) => {
  //     const [id, {
  //       creatorId, createdAt, nweetContent, attachmentUrl,
  //     }] = nweet;

  //     return {
  //       id,
  //       creatorId,
  //       createdAt,
  //       nweetContent,
  //       editing: false,
  //       newNweet: nweetContent,
  //       attachmentUrl,
  //     };
  //   });

  const nweets = Object.entries(data);

  const filteredNweets = [];

  for (let i = 0; i < nweets.length; i += 1) {
    const [, {
      creatorId, createdAt, nweetContent, attachmentUrl,
    }] = nweets[i];

    if (uid === creatorId) {
      filteredNweets.push({
        creatorId,
        createdAt,
        nweetContent,
        editing: false,
        newNweet: nweetContent,
        attachmentUrl,
      });
    }
  }

  return filteredNweets;
}

// TO-DO: delete
export function xx() {}
