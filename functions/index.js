const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp(functions.config().firebase);

exports.sendNotification = functions.firestore.document('events/{event_id}').onWrite(event=>{


    const title=event.after.get('title')
    const direction=event.after.get('direction')

    const payload={
        notification:{
            title:"Nou Event! - "+title,
            body:direction
        }
    }

    const topics = "teamsup"

    return admin.messaging().sendToTopic(topics,payload).then(res=>{
    console.log('notification sent ')
    }).catch(err=>{
    console.log('notification sent '+err)
    })

})
