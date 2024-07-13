import toast from "./toast";

export default function (callback) {
  return async function (req) {
    try {
      return await callback(req);
    } catch (err) {
      toast.error(err);
      console.log(err);
      return {err};
    }
  };
}