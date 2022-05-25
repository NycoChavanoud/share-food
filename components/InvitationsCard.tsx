import axios from "axios";
import { useEffect, useState } from "react";

const InvitationsCard = () => {
  const [invitations, setInvitations] = useState<any | null>(null);

  const fetchInvitations = () => {
    axios
      .get(`/api/invitations`)
      .then((res) => setInvitations(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  console.log(invitations);

  return <div></div>;
};

export default InvitationsCard;
