// import React, { useEffect, useState } from 'react';
// import { Box, Typography, List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom';

// interface Item {
//   name: string;
//   quantity: number;
//   price: number;
// }

// interface Payment {
//   _id: string;
//   date: string;
//   amount: number;
//   items: Item[];
// }

// const GroceryPaymentHistory: React.FC = () => {
//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
//   const [open, setOpen] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const userId = location.state?.userId || '';

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/payments/${userId}`);
//         setPayments(response.data);
//       } catch (error) {
//         console.error('Error fetching payment history:', error);
//       }
//     };

//     if (userId) {
//       fetchPayments();
//     }
//   }, [userId]);

//   const handleListItemClick = (payment: Payment) => {
//     setSelectedPayment(payment);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleRepeatPurchase = async () => {
//     if (selectedPayment) {
//       try {
//         // Check availability of items
//         const checkResponse = await axios.post('http://localhost:5000/check-availability', {
//           cartItems: selectedPayment.items,
//         });

//         if (checkResponse.status === 200) {
//           // Save the payment information
//           await axios.post('http://localhost:5000/save-payment', {
//             userId,
//             cartItems: selectedPayment.items,
//             totalAmount: selectedPayment.amount,
//           });

//           // Update the database with the new quantities
//           await axios.post('http://localhost:5000/update-groceries', { cartItems: selectedPayment.items });

//           alert('Repeat purchase successful!');
//           setOpen(false);
//         } else {
//           alert('Some items are unavailable');
//         }
//       } catch (error) {
//         console.error('Error with repeat purchase:', error);
//         alert('Failed to repeat purchase');
//       }
//     }
//   };

//   return (
//     <Box sx={{ padding: 4 }}>
//       <Typography variant="h4" gutterBottom>Grocery Payment History</Typography>
//       <List>
//         {payments.map(payment => (
//           <ListItem button key={payment._id} onClick={() => handleListItemClick(payment)}>
//             <ListItemText
//               primary={`$${payment.amount}`}
//               secondary={new Date(payment.date).toLocaleDateString()}
//             />
//           </ListItem>
//         ))}
//       </List>

    //   <Dialog open={open} onClose={handleClose}>
    //     <DialogTitle>Payment Details</DialogTitle>
    //     <DialogContent>
    //       {selectedPayment && (
    //         <>
    //           <Typography variant="h6">Items:</Typography>
    //           <List>
    //             {selectedPayment.items.map((item, index) => (
    //               <ListItem key={index}>
    //                 <ListItemText
    //                   primary={`${item.name} - ${item.quantity} x $${item.price.toFixed(2)}`}
    //                 />
    //               </ListItem>
    //             ))}
    //           </List>
    //           <Typography variant="h6">Total: ${selectedPayment.amount.toFixed(2)}</Typography>
    //         </>
    //       )}
    //     </DialogContent>
    //     <DialogActions>
    //       <Button onClick={handleClose} color="primary">
    //         Close
    //       </Button>
    //       <Button onClick={handleRepeatPurchase} color="primary" variant="contained">
    //         Buy Again
    //       </Button>
    //     </DialogActions>
    //   </Dialog>

//       <Button onClick={() => navigate(-1)} color="primary" variant="contained">Back</Button>
//     </Box>
//   );
// };

// export default GroceryPaymentHistory;


import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

interface Item {
  name: string;
  quantity: number;
  price: number;
}

interface Payment {
  _id: string;
  date: string;
  amount: number;
  items: Item[];
}

const GroceryPaymentHistory: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId || '';

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/payments/${userId}`);
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payment history:', error);
      }
    };

    if (userId) {
      fetchPayments();
    }
  }, [userId]);

  const fetchPayments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/payments/${userId}`);
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payment history:', error);
    }
  };

  const handleListItemClick = (payment: Payment) => {
    setSelectedPayment(payment);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRepeatPurchase = async () => {
    if (selectedPayment) {
      try {
        // Check availability of items
        const checkResponse = await axios.post('http://localhost:5000/check-availability', {
          cartItems: selectedPayment.items,
        });

        if (checkResponse.status === 200) {
          // Save the payment information
          await axios.post('http://localhost:5000/save-payment', {
            userId,
            cartItems: selectedPayment.items,
            totalAmount: selectedPayment.amount,
          });

          // Update the database with the new quantities
          await axios.post('http://localhost:5000/update-groceries', { cartItems: selectedPayment.items });

          // Fetch updated payment history
          fetchPayments();

          alert('Repeat purchase successful!');
          setOpen(false);
        } else {
          alert('Some items are unavailable');
        }
      } catch (error) {
        console.error('Error with repeat purchase:', error);
        alert('Failed to repeat purchase');
      }
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Grocery Payment History</Typography>
      <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
        <List>
          {payments.map(payment => (
            <ListItem button key={payment._id} onClick={() => handleListItemClick(payment)}>
              <ListItemText
                primary={`$${payment.amount}`}
                secondary={new Date(payment.date).toLocaleDateString()}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Payment Details</DialogTitle>
        <DialogContent>
          {selectedPayment && (
            <>
              <Typography variant="h6">Items:</Typography>
              <List>
                {selectedPayment.items.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${item.name} - ${item.quantity} x $${item.price.toFixed(2)}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Typography variant="h6">Total: ${selectedPayment.amount.toFixed(2)}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleRepeatPurchase} color="primary" variant="contained">
            Buy Again
          </Button>
        </DialogActions>
      </Dialog>

      <Button onClick={() => navigate(-1)} color="primary" variant="contained">Back</Button>
    </Box>
  );
};

export default GroceryPaymentHistory;
