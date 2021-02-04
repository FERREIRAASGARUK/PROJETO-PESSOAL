import {makeStyles} from '@material-ui/styles'


const estilo = makeStyles({
    main:{
        display:'flex',
        flexDirection:'column',
        width:5000
    },
      carrinho: {
            display: 'flex',
            alignItems: 'center',
            flexDirection:'column',
            height: 500,
         
            marginTop: '5%',
            borderRadius: 10,
            width: 900,
            position: 'absolute',
        },
         produto: {
            height: 150,
            width: 490,
            margin: 0,
            display: 'flex',
            flexDirection: 'row',
            paddingRight: 15,
            marginRight: 0,
            borderRadius: 4,
  },
  footer: {
    height: 100,
    width: 490,
    margin: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
    marginRight: 0,
    background: '#1976d2',
  },
})

export default estilo;