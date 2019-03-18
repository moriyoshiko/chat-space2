json.array! @new_messages do |message|
  json.user_name message.user.name
  json.time message.created_at.strftime("%Y/%m/%d %H:%M:%S")
  json.content message.content
  json.imageURL message.image.url
  json.id message.id
end

