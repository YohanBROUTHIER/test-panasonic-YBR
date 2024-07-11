import sanitizeHtml from "sanitize-html";

export default function (req, res, next) {
  // Sanitized all string body property
  Object.keys(req.body).forEach(key => {
    if (typeof req.body[key] === "string") {
      req.body[key] = sanitizeHtml(req.body[key]);
    }
  });
  
  next();
}