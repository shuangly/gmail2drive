const FOLDER_NAME = 'Guitar videos for Shuangling';

function main(){
  const folderToAdd = getFolder_();
  
  // after:2020/12/19 
  const query = 'label:dennis has:attachment';
  const threads = GmailApp.search(query);

  threads.forEach(thread =>
    thread.getMessages().forEach(message => 
      message.getAttachments().forEach(attachment => {
        if (attachment.getName().includes('.mov')) {
          // milliseconds / 1000 because the last 3 digits are always 000 in message date
          // name starts with timestamp so we can keep files in order in Google drive
          const movName = message.getDate().getTime() / 1000 + ' ' + message.getDate().toLocaleDateString() + ' ' + message.getSubject();
          if (folderToAdd.getFilesByName(movName).hasNext()) {
              Logger.log(movName + ' exists, skipping.');
          } else {
              folderToAdd.createFile(attachment).setName(movName);
          }
        }
      })
    )                  
  );
}

function getFolder_(){
  const fi = DriveApp.getFoldersByName(FOLDER_NAME);
  if(fi.hasNext()){
    return fi.next();
  } else{
    Logger.log('Error: drive folder not found');
    return null;
  }
}
