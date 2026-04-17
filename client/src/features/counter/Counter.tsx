import { Box, Button, ButtonGroup, List, ListItem, Paper, Typography } from "@mui/material";
import { useStore } from "../../lib/hooks/useStore";
import { observer } from "mobx-react-lite";

const Counter = observer(function Counter() {
  const { counterStore } = useStore();
  return (

    <Box display='flex' justifyContent='space-between' >
      <Box sx={{ width: '60%' }}>
        <Typography variant="h4" gutterBottom>{counterStore.title} </Typography>
        <Typography variant="h4">The counter is {counterStore.count} </Typography>

        <ButtonGroup sx={{ mt: 3 }}>
          <Button color="error" variant="contained" onClick={() => counterStore.decrement()}>Decrement</Button>
          <Button color="success" variant="contained" onClick={() => counterStore.increment()}>Increment</Button>
          <Button color="primary" variant="contained" onClick={() => counterStore.increment(5)}>Increment by 5</Button>
        </ButtonGroup>
      </Box>
      <Paper sx={{width: '40%', p: 4}}>
        <Typography variant="h5">Counter events ({counterStore.eventCounts})</Typography>
        <List>
          {counterStore.events.map((event, index) => (
            <ListItem key={index}>{event}</ListItem>
          ))}
        </List>
      </Paper>



    </Box>

  )
});

export default Counter; 