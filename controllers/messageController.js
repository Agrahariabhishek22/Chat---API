const Conversation=require('../models/conversationalModel')
const Message=require('../models/messageModel');

exports.sendMessage=async(req,res)=>{
      try {
            const senderId=req.id;
            const recieverId=req.params.id;

            const {message}=req.body;

            // finding conversation with participants as senderId,recieverId 
            let gotConversation=await Conversation.findOne({
                  participants:{$all: [senderId,recieverId]},
            });
            // if conversation doesnt exist create new conversation between sender and recviever
            if(!gotConversation){
                  gotConversation=await Conversation.create({
                        participants:[senderId,recieverId],
                  })
            };

            // creating message (chat)
            const newMessage=await Message.create({
                  senderId,
                  recieverId,
                  message,
            });
            if(newMessage){
                  gotConversation.messages.push(newMessage._id);
            };
            // updating changes made in gotConversation
            await gotConversation.save();

            // Socket IO

            return res.status(200).json({
                  newMessage
             })

      } catch (error) {
            console.log(error);
      }
}

exports.getMessage=async(req,res)=>{
      try {
            const recieverId=req.params.id;
            const senderId=req.id;
            const conversation=await Conversation.findOne({
                  participants:{$all:[senderId,recieverId]}
            }).populate("messages");

            return res.status(200).json(
                  conversation?.messages
            )
             
      } catch (error) {
            
      }
}