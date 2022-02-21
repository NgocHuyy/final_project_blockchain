import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter
 } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
        
        
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: 'green',
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
      width: 50
    },
    name: {
        fontWeight: 'bold',
        color: 'blue'
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'black',
        padding: '3px 10px',
        display: 'inline-block'
    },
    khung: {
      margin: '10px auto',
      maxWidth: 1050,
    }
  }));

  function convertStep(step){
    let str = '';
    switch (step){
        case 1: 
            str = 'Paid';
            break;
        case 2: 
            str = 'Delivered'
            break;
        default:
            str = 'Created'
            break;
    }
    return str;
}
function MTable(props) {
  const classes = useStyles();

  return (
    <div className={classes.khung}>
      <p className="title_table title_table_users">PRODUCT INFORMATION</p>
      <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Product</TableCell>
              <TableCell className={classes.tableHeaderCell}>Price</TableCell>
              <TableCell className={classes.tableHeaderCell}>Address Createdr</TableCell>
              <TableCell className={classes.tableHeaderCell}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {props.listItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                      <Grid container>
                          <Grid item lg={2}>
                              <img alt="Image" src= {item.urlImage} className={classes.avatar}/>
                          </Grid>
                          <Grid item lg={10}>
                              <Typography className={classes.name}>{item.name}</Typography>
                              <Typography color="textSecondary" variant="body2">{item.addressItem}</Typography>
                          </Grid>
                      </Grid>
                    </TableCell>
                  <TableCell>
                      <Typography color="primary" variant="subtitle2">{item.price} ETH</Typography>
                    </TableCell>
                  <TableCell>{item.addressCreator}</TableCell>
                  <TableCell>
                      <Typography 
                        className={classes.status}
                        style={{
                            backgroundColor: 
                            ((item.status === 0 && 'blue') ||
                            (item.status === 1 && 'orange') ||
                            (item.status === 2 && 'gray'))
                        }}
                      >{convertStep(item.status)}</Typography>
                    </TableCell>
                </TableRow> 
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    
  );
}

export default MTable;