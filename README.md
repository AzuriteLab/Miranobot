現状は特定のチャンネルにVRChatのユーザページを含むメッセージを投稿したら指定したロールを外すだけのDiscord BOT

実装はDiscord API v10ベースです

## Require

app_settings.jsonがindex.jsと同じ階層に必要です

```json
{
    "discord_token":"<ディスコードのトークン>",
    "target_role_id":"<外したいロール>",
    "target_channel_id":"<監視したいチャンネルのID>"
}
```