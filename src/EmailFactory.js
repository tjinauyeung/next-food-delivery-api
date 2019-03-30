const nodemailer = require("nodemailer");
const Email = require("email-templates");
const path = require("path");

const EmailFactory = {
  create() {
    return new Email({
      message: {
        from: process.env.EMAIL_SELF
      },
      views: {
        root: "templates"
      },
      transport: nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_SELF,
          pass: process.env.EMAIL_PASSWORD
        }
      }),
      juice: true,
      juiceResources: {
        preserveImportant: true,
        webResources: {
          //
          // this is the relative directory to your CSS/image assets
          // and its default path is `build/`:
          //
          // e.g. if you have the following in the `<head`> of your template:
          // `<link rel="stylesheet" style="style.css" data-inline" />`
          // then this assumes that the file `build/style.css` exists
          //
          relativeTo: path.resolve("static")
          //
          // but you might want to change it to something like:
          // relativeTo: path.join(__dirname, '..', 'assets')
          // (so that you can re-use CSS/images that are used in your web-app)
          //
        }
      }
    });
  }
};

module.exports = EmailFactory;
