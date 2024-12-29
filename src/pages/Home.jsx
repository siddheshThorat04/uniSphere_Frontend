import React, { useEffect, useState } from "react";
// import TermsModal from "../components/Home/TermsModal";
import { socket } from "../Socket";
import { useChat } from "../contextApi/ChatContext";
import HomeDesktop from "../components/Home/HomeDesktop"; // Updated path

const Home = () => {
  const {
    userId,
    receiver,
    isSearching,
    setReceiver,
    setIsTyping,
    setMessage,
    setIsSearching,
  } = useChat();
  // Handle socket events
  useEffect(() => {
    if (userId && isSearching) {
      socket.emit("unpairing-user", userId, () => {
        setIsSearching(false);
      });
    }

    if (receiver) {
      socket.emit("chat-close", receiver, () => {
        setReceiver("");
        setIsTyping(false);
        setMessage("");
      });
    }
  }, [userId, isSearching, receiver, setReceiver, setIsSearching, setIsTyping, setMessage]);

  return (
    <div className="homeCenter">
      
      <HomeDesktop  />

      
    </div>
  );
};

export default Home;


// import React, { useEffect, useState } from "react";
// import TermsModal from "../components/Home/TermsModal";
// import { socket } from "../Socket";
// import { useChat } from "../contextApi/ChatContext";
// import HomeDesktop from "../components/Home/HomeDesktop"; // Updated path

// const Home = () => {
//   const {
//     userId,
//     receiver,
//     isSearching,
//     setReceiver,
//     setIsTyping,
//     setMessage,
//     setIsSearching,
//   } = useChat();
//   const [isTermsModal, setIsTermsModal] = useState(false);

//   // Handle socket events
//   useEffect(() => {
//     if (userId && isSearching) {
//       socket.emit("unpairing-user", userId, () => {
//         setIsSearching(false);
//       });
//     }

//     if (receiver) {
//       socket.emit("chat-close", receiver, () => {
//         setReceiver("");
//         setIsTyping(false);
//         setMessage("");
//       });
//     }
//   }, [userId, isSearching, receiver, setReceiver, setIsSearching, setIsTyping, setMessage]);

//   return (
//     <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
//       <HomeDesktop setIsTermsModal={setIsTermsModal} />

//       {isTermsModal && <TermsModal setIsTermsModal={setIsTermsModal} />}
//     </div>
//   );
// };

// export default Home;
