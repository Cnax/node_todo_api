const express = require('express')
const bodyParser = require('body-parser')
const models = require('../db/models')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded());

// parse application/json
app.use(bodyParser.json())


function errHandler (err, req, res, next) {
  if (err) {
    res.status(500)
      .json({
        msg: '服务器异常' + err.message
      })
  } else {
    next()
  }
}

/**
 * 查询列表
 */
app.get('/list', async (req, res) => {
  const { status, page = 1, size = 10 } = req.query
  const list = await models.Todo.findAndCountAll({
    where: {
      ...(status && { status })
    },
    limit: size,
    offset: (page - 1) * size
  })
  res.json({
    list,
    msg: '列表查询成功'
  })
})

app.post('/create', async (req, res) => {
  try {
    const todo = await models.Todo.create({
      ...req.body
    })
    res.json({
      todo,
      msg: '创建成功'
    })
  } catch (error) {
    // 抛全局的错误异常
    next(error)
  }
})

app.post('/update', async (req, res) => {
  const { name, deadline, content, id, status } = req.body
  const todo = await models.Todo.findOne({
    where: {
      id
    }
  })
  // id 在数据表中存在
  if (todo) {
    todo.update({
      ...(name && { name }),
      ...(deadline && { deadline }),
      ...(content && { content }),
      ...(status && { status }),
    })
  }
  res.json({
    msg: '修改成功',
    todo
  })
})

app.use(errHandler)

app.listen(3000, () => {
  console.log('app is runing');
})