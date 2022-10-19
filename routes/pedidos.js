const express = require('express');
const router = express.Router();

//retorna todos os pedidos
router.get('/', (req, res, next)=>{
    res.status(200).send({
        mensagem: 'usando o get dentro da rota de pedidos'
    });
});


//insere um pedido
router.post('/', (req, res, next) => {
    const pedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    }

    res.status(201).send({
        mensaegm: 'usando o post dentro da rota de pedidos',
        pedidoCriado: pedido
    });
});

//retorna os dados de um pedido específico
router.get('/:id_pedido', (req, res, next)=>{
    const id = req.params.id_pedido

    if(id ==='especial'){
        res.status(200).send({
            mensagem: 'você descobriu o akuma dos pedidos. Muito bom!',
            id: id
        });
    }else {
        res.status(200).send({
            mensgem:'você passou um id'
        });
    }

})


//altera um pedido
router.patch('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'usando o patch dentro da rota de pedido'
    })
})


//deleta um produto
router.delete('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'usando o delete dentro da rota de pedido'
    })
})


module.exports = router;