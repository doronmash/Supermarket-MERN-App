// // GroceryPaymentHistory.tsx
// import React, { useEffect, useState } from 'react';
// import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
// import axios from 'axios';

// interface Payment {
//   id: string;
//   date: string;
//   amount: number;
//   description: string;
// }

// const GroceryPaymentHistory: React.FC = () => {
//   const [payments, setPayments] = useState<Payment[]>([]);

//   useEffect(() => {
//     const fetchPayments = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/payments');
//         setPayments(response.data);
//       } catch (error) {
//         console.error('Error fetching payment history:', error);
//       }
//     };

//     fetchPayments();
//   }, []);

//   return (
//     <Box sx={{ padding: 4 }}>
//       <Typography variant="h4" gutterBottom>Grocery Payment History</Typography>
//       <List>
//         {payments.map(payment => (
//           <ListItem key={payment.id}>
//             <ListItemText
//               primary={`$${payment.amount} - ${payment.description}`}
//               secondary={payment.date}
//             />
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );
// };

// export default GroceryPaymentHistory;


import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

interface Payment {
  _id: string;
  date: string;
  amount: number;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

const GroceryPaymentHistory: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const location = useLocation();
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

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Grocery Payment History</Typography>
      <List>
        {payments.map(payment => (
          <Box key={payment._id} sx={{ marginBottom: 2 }}>
            <ListItem>
              <ListItemText
                primary={`Payment Date: ${new Date(payment.date).toLocaleDateString()}`}
                secondary={`Total Amount: $${payment.amount.toFixed(2)}`}
              />
            </ListItem>
            {payment.items.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${item.name} - Quantity: ${item.quantity} - Price: $${item.price.toFixed(2)}`}
                />
              </ListItem>
            ))}
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default GroceryPaymentHistory;
