import PouchDB from 'pouchdb'
import groupBy from 'lodash/groupBy'
import forEach from 'lodash/forEach'

export const db = new PouchDB('coypu-offline')
const dbVersion = 1

const schemaKey = 'schema'

// TODO: works only for migration to 1.2.0
export const migrate = () => {
  db.get(schemaKey).catch(error => {
    if (error.status === 404) {
      db.allDocs({
        include_docs: true
      }).then(docs => {
        return Promise.all(docs.rows.map(row => {
          const grouped = groupBy(row.doc.tasks, 'date')
          const days = []

          forEach(grouped, (tasks, date) => {
            days.push({
              _id: date,
              tasks: tasks.map(task => {
                return { body: task.body, completion: task.completion }
              })
            })
          })

          return db.bulkDocs(days).then(() => {
            db.remove(row.id, row.value.rev)
          })
        }))
      }).then(() => {
        db.put({
          _id: schemaKey,
          version: dbVersion
        })
      })
    }
  })
}
