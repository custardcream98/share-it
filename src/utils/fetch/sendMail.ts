const MAILING_SERVER_URL = "https://share-it-5aad7.web.app";

export interface EMAIL {
  receiver: string;
  title: string;
  senderUsername: string;
  commentContent: string;
  postId: string;
}

type Token = {
  token: string;
  email: EMAIL;
};
const sendMail = async ({ token, email }: Token) => {
  try {
    const response = await fetch(
      `${MAILING_SERVER_URL}/sendMail`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        keepalive: true,
        body: JSON.stringify({
          email_receiver: email.receiver,
          post_title: email.title,
          username: email.senderUsername,
          comment: email.commentContent,
          link_to_post: `https://share-it-rust.vercel.app/post/${email.postId}`,
        }),
      }
    );

    if (!response.ok)
      throw Error(
        `GET ${MAILING_SERVER_URL} API 서버 오류`
      );

    return await response.json();
  } catch (e) {
    console.error(e);
  }
};

export default sendMail;
