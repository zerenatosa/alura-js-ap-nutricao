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
            'select * from clientes;',
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
            /* 'insert into tb_clientes (cd_cliente, nome) values (?, ?)',
            [req.body.cd_cliente,req.body.nome], */
            'insert into clientes (nome, cpf, renda, data_nascimento, idade, justificativa, matricula) values (?,?,?,?,?,?,?)',
            [req.body.nome, req.body.cpf, req.body.renda, req.body.data_nascimento, req.body.idade, req.body.justificativa, req.body.matricula],
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
            'select * from clientes where cd_cliente = ?;',
            [req.params.id_produto],
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
/*     res.status(201).send({
        mensagem: 'usando o patch dentro da rota de produtos'
    }) */
    mysql.getConnection((error, conn)=> {
        if(error){return res.status(500).send({error:error})}
        conn.query(
            /* 'insert into clientes (nome, cpf, renda, data_nascimento, idade, justificativa, matricula) values (?,?,?,?,?,?,?)', */
            'UPDATE clientes SET nome = ?, cpf = ?, justificativa = ? where cd_cliente =?',
            /* [req.body.nome, req.body.cpf, req.body.renda, req.body.data_nascimento, req.body.idade, req.body.justificativa, req.body.matricula], */
            [req.body.nome, req.body.cpf,req.body.justificativa, req.body.cd_cliente],
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
})

//exclui um produto
router.delete('/', (req, res, next) =>{
/*     res.status(201).send({
        mensagem: 'usando o delete dentro da rota de produtos'
    }) */

    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({error:error})}
        conn.query(
            'delete from clientes where cd_cliente = ?;',
            [req.body.id_produto],
            (error, resultado, fields) =>{
                conn.release();
                if(error){return res.status(500).send({error:error})}
                return res.status(202).send({response: resultado})
            }
        )
    })
})


module.exports = router;