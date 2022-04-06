const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const generator = require('generate-password');
admin.initializeApp();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'test@test.com', //change these
        pass: 'password'    //change these
    }
});

const emailHTML = (email, pass) => {
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:Arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
     <head> 
      <meta charset="UTF-8"> 
      <meta content="width=device-width, initial-scale=1" name="viewport"> 
      <meta name="x-apple-disable-message-reformatting"> 
      <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
      <meta content="telephone=no" name="format-detection"> 
      <title>New email 2</title> 
      <!--[if (mso 16)]>
        <style type="text/css">
        a {text-decoration: none;}
        </style>
        <![endif]--> 
      <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
      <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG></o:AllowPNG>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]--> 
      <style type="text/css">
    #outlook a {
        padding:0;
    }
    .ExternalClass {
        width:100%;
    }
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
        line-height:100%;
    }
    .es-button {
        mso-style-priority:100!important;
        text-decoration:none!important;
    }
    a[x-apple-data-detectors] {
        color:inherit!important;
        text-decoration:none!important;
        font-size:inherit!important;
        font-family:inherit!important;
        font-weight:inherit!important;
        line-height:inherit!important;
    }
    .es-desk-hidden {
        display:none;
        float:left;
        overflow:hidden;
        width:0;
        max-height:0;
        line-height:0;
        mso-hide:all;
    }
    @media only screen and (max-width:600px) {p, ul li, ol li, a { font-size:16px!important; line-height:150%!important } h1 { font-size:30px!important; text-align:center; line-height:120%!important } h2 { font-size:26px!important; text-align:center; line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } h1 a { font-size:30px!important } h2 a { font-size:26px!important } h3 a { font-size:20px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:11px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:block!important; border-width:10px 20px 10px 20px!important } }
    </style> 
     </head> 
     <body style="width:100%;font-family:Arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
      <div class="es-wrapper-color" style="background-color:#F4F0F0"> 
       <!--[if gte mso 9]>
                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                    <v:fill type="tile" color="#f4f0f0" origin="0.5, 0" position="0.5,0"></v:fill>
                </v:background>
            <![endif]--> 
       <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
         <tr style="border-collapse:collapse"> 
          <td valign="top" style="padding:0;Margin:0"> 
           <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
             <tr style="border-collapse:collapse"> 
              <td align="center" style="padding:0;Margin:0"> 
               <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" bgcolor="#6a8fa8" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:25px;padding-bottom:40px;background-color:#6A8FA8"> 
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                       <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="Margin:0;padding-bottom:15px;padding-left:20px;padding-right:20px;padding-top:25px;font-size:0px"><img class="adapt-img" src="https://izaabo.stripocdn.email/content/guids/CABINET_e3e03386431bfdb068f105b5024915ad/images/1341612206424340.png" alt width="124" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" height="96"></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;padding-bottom:10px"><h1 style="Margin:0;line-height:41px;mso-line-height-rule:exactly;font-family:'trebuchet ms', 'lucida grande', 'lucida sans unicode', 'lucida sans', tahoma, sans-serif;font-size:34px;font-style:normal;font-weight:normal;color:#060606"><strong>Benevolence Ministry</strong><br></h1></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0"><h3 style="Margin:0;line-height:26px;mso-line-height-rule:exactly;font-family:'trebuchet ms', 'lucida grande', 'lucida sans unicode', 'lucida sans', tahoma, sans-serif;font-size:22px;font-style:normal;font-weight:normal;color:#242424">Your account has been set up for the CFC Benevolence ministry!</h3></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:Arial, sans-serif;line-height:21px;color:#333333"><strong><span>Your Account Info Is:</span></strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:Arial, sans-serif;line-height:21px;color:#333333"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:Arial, sans-serif;line-height:21px;color:#333333"><strong><span>Email:&nbsp;</span></strong>${email}</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:Arial, sans-serif;line-height:21px;color:#333333"><br></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:Arial, sans-serif;line-height:21px;color:#333333"><strong><span>Password:&nbsp;</span></strong>${pass}<br><br>Please go to&nbsp;<a href="https://localhost:3000/" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Arial, sans-serif;font-size:14px;text-decoration:none;color:#FFFFFF">https://localhost:3000/</a>&nbsp;to login and start filling out your information!</p></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
      </div>  
     </body>
    </html>`
}
const emailHTML2 = (email, link) => {
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:Arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
     <head> 
      <meta charset="UTF-8"> 
      <meta content="width=device-width, initial-scale=1" name="viewport"> 
      <meta name="x-apple-disable-message-reformatting"> 
      <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
      <meta content="telephone=no" name="format-detection"> 
      <title>New email 2</title> 
      <!--[if (mso 16)]>
        <style type="text/css">
        a {text-decoration: none;}
        </style>
        <![endif]--> 
      <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
      <!--[if gte mso 9]>
    <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG></o:AllowPNG>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]--> 
      <style type="text/css">
    #outlook a {
        padding:0;
    }
    .ExternalClass {
        width:100%;
    }
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
        line-height:100%;
    }
    .es-button {
        mso-style-priority:100!important;
        text-decoration:none!important;
    }
    a[x-apple-data-detectors] {
        color:inherit!important;
        text-decoration:none!important;
        font-size:inherit!important;
        font-family:inherit!important;
        font-weight:inherit!important;
        line-height:inherit!important;
    }
    .es-desk-hidden {
        display:none;
        float:left;
        overflow:hidden;
        width:0;
        max-height:0;
        line-height:0;
        mso-hide:all;
    }
    @media only screen and (max-width:600px) {p, ul li, ol li, a { font-size:16px!important; line-height:150%!important } h1 { font-size:30px!important; text-align:center; line-height:120%!important } h2 { font-size:26px!important; text-align:center; line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } h1 a { font-size:30px!important } h2 a { font-size:26px!important } h3 a { font-size:20px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:11px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } a.es-button, button.es-button { font-size:20px!important; display:block!important; border-width:10px 20px 10px 20px!important } }
    </style> 
     </head> 
     <body style="width:100%;font-family:Arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
      <div class="es-wrapper-color" style="background-color:#F4F0F0"> 
       <!--[if gte mso 9]>
                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                    <v:fill type="tile" color="#f4f0f0" origin="0.5, 0" position="0.5,0"></v:fill>
                </v:background>
            <![endif]--> 
       <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
         <tr style="border-collapse:collapse"> 
          <td valign="top" style="padding:0;Margin:0"> 
           <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
             <tr style="border-collapse:collapse"> 
              <td align="center" style="padding:0;Margin:0"> 
               <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center"> 
                 <tr style="border-collapse:collapse"> 
                  <td align="left" bgcolor="#6a8fa8" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:25px;padding-bottom:40px;background-color:#6A8FA8"> 
                   <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                     <tr style="border-collapse:collapse"> 
                      <td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
                       <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="Margin:0;padding-bottom:15px;padding-left:20px;padding-right:20px;padding-top:25px;font-size:0px"><img class="adapt-img" src="https://izaabo.stripocdn.email/content/guids/CABINET_e3e03386431bfdb068f105b5024915ad/images/1341612206424340.png" alt width="124" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" height="96"></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;padding-bottom:10px"><h1 style="Margin:0;line-height:41px;mso-line-height-rule:exactly;font-family:'trebuchet ms', 'lucida grande', 'lucida sans unicode', 'lucida sans', tahoma, sans-serif;font-size:34px;font-style:normal;font-weight:normal;color:#060606"><strong>Benevolence Ministry</strong><br></h1></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0"><h3 style="Margin:0;line-height:26px;mso-line-height-rule:exactly;font-family:'trebuchet ms', 'lucida grande', 'lucida sans unicode', 'lucida sans', tahoma, sans-serif;font-size:22px;font-style:normal;font-weight:normal;color:#242424">Your account has been set up for the CFC Benevolence ministry!</h3></td> 
                         </tr> 
                         <tr style="border-collapse:collapse"> 
                          <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:Arial, sans-serif;line-height:21px;color:#333333"><strong><span>Click the link below to login and start filling out your information:</span></strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:Arial, sans-serif;line-height:21px;color:#333333">Please click &nbsp;<a href="${link}" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:Arial, sans-serif;font-size:14px;text-decoration:none;color:#FFFFFF">Here</a>&nbsp;to login and start filling out your information!</p></td> 
                         </tr> 
                       </table></td> 
                     </tr> 
                   </table></td> 
                 </tr> 
               </table></td> 
             </tr> 
           </table></td> 
         </tr> 
       </table> 
      </div>  
     </body>
    </html>`
}

const sendEmail = (email, pass) => {
    
      
        const mailOptions = {
            from: 'test <test@test.com>', 
            to: email,
            subject: 'test@test.com', 
            html: emailHTML(email, pass)
        };
  
        // returning result
        return transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                throw error
            }else {
                return 'Sent';
            }
            
        });
   
}

const sendEmail2 = (email, link) => {
    
      
    const mailOptions = {
        from: 'test <test@test.com>', 
        to: email,
        subject: 'test <test@test.com>', 
        html: emailHTML2(email, link)
    };

    // returning result
    return transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            throw error
        }else {
            return 'Sent';
        }
        
    });

}

 

exports.createUser = functions.https.onCall( async (data, context) => {
   
    
    const password = generator.generate({
        length: 12,
        numbers: true
    });
    
    const uid = context.auth.uid;
    const userCheck = await admin.firestore().collection('users').doc(uid).get();
    if(userCheck.exists){
        const user = userCheck.data()
        if(user.permissions.includes("admin")){
            //admin authenticated
            try{
                
                
                const authResult = await admin.auth().createUser({email: data.email, password: password, displayName: data.name})
                
                const writeResult = await admin.firestore().collection('users').doc(authResult.uid).set({
                    name: data.name,
                    email: data.email,
                    loginSent: false,
                    createdAt: Date.now(),
                    permissions: [`${data.role}`],
                });

                const writeResult2 = await admin.firestore().collection('profiles').doc(authResult.uid).set({
                    name: data.name,
                    email:data.email,
                    questions: data.questions,
                    initialContact: data.contact,
                    phone: data.phone,
                    address: data.address,
                    deaconIDs: [],
                    createdAt: Date.now(), 
                });

                if(data.role === 'admin' || data.role === 'committee' || data.role === 'deacon'){
                    await sendEmail(data.email, password)
                }   
                
    
                return {message: `User ${data.name} added. An email containing their login information has been sent to their email if they are an deacon / admin, otherwise you may send a log in link at the time of your choosing in the admin dashboard`, type: 'success'};
                 
            }catch(e){
                return {message: `failed to create user - ${e}`, type: 'error'};
            }
            
        }else{
            return {message: `Not Authenticated`, type: 'error'}; 
        }
    } else {
        return {message: `No User Found`, type: 'error'};
    }

  });

  exports.deleteUser = functions.https.onCall( async (data, context) => {
   
    
    const uid = context.auth.uid;
    const userCheck = await admin.firestore().collection('users').doc(uid).get();
    if(userCheck.exists){
        const user = userCheck.data()
        if(user.permissions.includes("admin")){
            //admin authenticated
            try{
                
                try{
                    await admin.auth().deleteUser(data.uid)
                } catch(e){
                    console.log('auth account not found -', e)
                }
                await admin.firestore().collection('users').doc(data.uid).delete()
                
                await admin.firestore().collection('profiles').doc(data.uid).delete()


                return {message: `User ${data.uid} deleted`, type: 'success'};
                 
            }catch(e){
                return {message: `failed to delete user - ${e}`, type: 'error'};
            }
            
        }else{
            return {message: `Not Authenticated`, type: 'error'}; 
        }
    } else {
        return {message: `No User Found`, type: 'error'};
    }

  });

  exports.closeFile = functions.https.onCall( async (data, context) => {
   
    
    const uid = context.auth.uid;
    const userCheck = await admin.firestore().collection('users').doc(uid).get();
    if(userCheck.exists){
        const user = userCheck.data()
        if(user.permissions.includes("admin")){
            //admin authenticated
            try{
                
                
                await admin.auth().deleteUser(data.uid)
                
                const writeResult = await admin.firestore().collection('users').doc(data.uid).update({
                    accountLocked: true
                });


                return {message: `User ${data.uid} file closed`, type: 'success'};
                 
            }catch(e){
                return {message: `failed to close user - ${e}`, type: 'error'};
            }
            
        }else{
            return {message: `Not Authenticated`, type: 'error'}; 
        }
    } else {
        return {message: `No User Found`, type: 'error'};
    }

  });


  exports.sendLogin = functions.https.onCall( async (data, context) => {
   
    
    const uid = context.auth.uid;
    const userCheck = await admin.firestore().collection('users').doc(uid).get();
    if(userCheck.exists){
        const user = userCheck.data()
        if(user.permissions.includes("admin") || user.permissions.includes("deacon") || user.permissions.includes("committee")){
            //admin authenticated
            try{
                const actionCodeSettings = {
                
                    url: 'https://localhost:3000/linkSignIn',
                    handleCodeInApp: true,
  
                };
                const usremail = data.email;
               
                let link = await admin.auth().generateSignInWithEmailLink(usremail, actionCodeSettings)

                await sendEmail2(data.email, link)
                
                await admin.firestore().collection('users').doc(data.uid).update({
                    loginSent: true,
                })


                return {message: `User ${data.uid} login sent`, type: 'success'};
                 
            }catch(e){
                return {message: `failed to send login info - ${e}`, type: 'error'};
            }
            
        }else{
            return {message: `Not Authenticated`, type: 'error'}; 
        }
    } else {
        return {message: `No User Found`, type: 'error'};
    }

  });
