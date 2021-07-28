require("../config/db.config");

const faker = require("faker");
const mongoose = require("mongoose")

const Project = require("../models/Project.model");
const User = require("../models/User.model");

mongoose.connection.once('connected', () => {
  mongoose.connection.db.dropDatabase()
    .then(() => {
      console.log('Database cleared');

    })
    .then(() => {
      // Create N users

      const usersToCreate = []

      for (let i = 0; i < 20; i++) {
        const user = {
          fullName: faker.name.findName(),
          email: faker.internet.email(),
          password: "fakepassword",
          image: faker.internet.avatar(),
          active: true,
        }

        usersToCreate.push(user)
      }

      // const usersToCreate = new Array(20).fill().map(() => ({
      //   fullName: faker.name.findName(),
      //     email: faker.internet.email(),
      //     password: "fakepassword",
      //     image: faker.internet.avatar()
      // }))

      return User.create(usersToCreate)
    })
    .then(users => {
      const projectsToCreate = [];

      users.forEach((user) => {
        console.log(`Created user with name ${user.fullName}`)


        for (let j = 0; j < 4; j++) {
          const project = {
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraphs(),
            images: [faker.internet.avatar(), faker.internet.avatar()],
            owner: user._id
          }
  
          projectsToCreate.push(project)
        }

      })

      return Project.insertMany(projectsToCreate)
    })
    .then((projects) => {
      projects.forEach((project) => {
        console.log(`Created project with title ${project.title} for user with id ${project.owner}`)
      })
    })
    .catch(e => console.error(e))
    .finally(() => {
      mongoose.connection.close()
        .then(() => console.log('Finish seeds.js'))
        .catch(e => console.error(e))
        .finally(() => {
          process.exit(0)
        })
    })
})