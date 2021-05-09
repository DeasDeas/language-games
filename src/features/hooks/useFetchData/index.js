import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export const useFetchData = (request, actionCreator) => {
  const [_, setDataReceived] = useState(false);
  const [messages, setMessages] = useState(null)

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const req = await request();
      setMessages(req.message);
      dispatch(actionCreator(req.data));
      setDataReceived(true);
    })();
  }, []);

  return messages
};