const express = require('express');
const router = express.Router();
const mysql = require('./mysql').pool;

//retorna todos os produtos
router.get('/', (req, res, next)=>{
/*     res.status(200).send({
        mensagem: 'usando o get dentro da rota de produtos'
    }); */

    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'select * from produtos;',
            (error, resultado, fields) =>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                return res.status(200).send({response: resultado})
            }
        )
    })
});


//insere um produto
router.post('/', (req, res, next) => {


    mysql.getConnection((error, conn)=> {
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'insert into produtos (nome, preco) values (?, ?)',
            [req.body.nome,req.body.preco],
            (error, resultado, field)=>{
                conn.release();
                if(error){
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                } 
                res.status(201).send({
                    mensaegm: 'Produto inserido com sucesso',
                    id_produto: resultado.insertId
                })
            }
        )
    })

});

//retorna os dados de um produto específico
router.get('/:id_produto', (req, res, next)=>{
    

    /* const id = req.params.id_produto

    if(id ==='especial'){
        res.status(200).send({
            mensagem: 'você descobriu o akuma',
            id: id
        });
    }else {
        res.status(200).send({
            mensgem:'você passou um id'
        });
    } */

    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'select * from produtos;',
            (error, resultado, fields) =>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                return res.status(200).send({response: resultado})
            }
        )
    })

})

//altera um produto
router.patch('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'usando o patch dentro da rota de produtos'
    })
})

//exclui um produto
router.delete('/', (req, res, next) =>{
    res.status(201).send({
        mensagem: 'usando o delete dentro da rota de produtos'
    })
})


module.exports = router;