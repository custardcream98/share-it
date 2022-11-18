# Share It!

특정 과제, 문제에 대해 자기가 작성한 코드를 나누는 웹사이트

# NoSQL DB Scheme

```json
{
  "posts": {
    "postId1": {
      "title": "제목, string",
      "category": ["카테고리, string"],
      "likes": ["좋아요를 누른 사람의 uid, string"],
      "createdAt": "글이 작성된 시점, number(timestamp)",
      "editedAt": "글이 수정된 시점, number(timestamp)",
      "uid": "글을 작성한 작성자의 uid",
      "profilePhotoURL": "프로필 사진 URL, string",
      "username": "유저네임, string"
    }
  },
  "comments": {
    "postId1": {
      "commentId1": {
        "content": "댓글 내용, string",
        "uid": "글을 작성한 작성자의 uid",
        "username": "유저네임, string",
        "profilePhotoURL": "프로필 사진 URL, string",
        "createdAt": "댓글이 작성된 시점, number(timestamp)",
        "editedAt": "댓글이 수정된 시점, number(timestamp)",
        "subcommentTo": "대댓글인 경우 commentId, 이외에는 false"
      },
      "commentId2": {
        "content": "댓글 내용, string",
        "uid": "글을 작성한 작성자의 uid",
        "username": "유저네임, string",
        "profilePhotoURL": "프로필 사진 URL, string",
        "createdAt": "댓글이 작성된 시점, number(timestamp)",
        "editedAt": "댓글이 수정된 시점, number(timestamp)",
        "subcommentTo": "대댓글인 경우 commentId, 이외에는 false"
      }
    }
  },
  "profile": {
    "posts": ["postId"],
    "comments": [
      {
        "postId": "postId",
        "commentId": "commentId"
      }
    ],
    "likes": ["postId"]
  }
}
```

> NoSQL의 한계로 Data Redundency는 해결하지 못함. 추후 RDB로 DB 개발이 필요
> 따라서 username은 현재로서는 변경하는것을 포기해야 함.

> 일일 무료 할당량 1GB, 50,000번의 문서 읽기, 20,000번의 문서 쓰기가 주어진다는 것을 감안할 때 토이 프로젝트의 DB로는 문제가 없을것으로 생각됨.
