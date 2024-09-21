import { PrismaClient, UserSex, Day, Teacher, Subject } from '@prisma/client'
import { faker } from '@faker-js/faker'

// const prisma = new PrismaClient()

// const GRADE_COUNT = 6
// const CLASS_PER_GRADE = 3
// const STUDENTS_PER_CLASS = 20
// const TEACHER_COUNT = 20
// const SUBJECT_COUNT = 10

// async function main() {
//   function randomEnum<T extends object>(anEnum: T): T[keyof T] {
//     const enumValues = Object.values(anEnum)
//     const randomIndex = Math.floor(Math.random() * enumValues.length)
//     return enumValues[randomIndex] as T[keyof T]
//   }

//   // Create Admin accounts
//   const adminCount = 3
//   for (let i = 0; i < adminCount; i++) {
//     await prisma.admin.create({
//       data: {
//         id: `admin${i + 1}`,
//         username: faker.internet.userName(),
//       },
//     })
//   }

//   // Create Grades
//   for (let i = 1; i <= GRADE_COUNT; i++) {
//     await prisma.grade.create({
//       data: { level: i },
//     })
//   }

//   // Create Classes
//   for (let grade = 1; grade <= GRADE_COUNT; grade++) {
//     for (let classNum = 1; classNum <= CLASS_PER_GRADE; classNum++) {
//       await prisma.class.create({
//         data: {
//           name: `${grade}-${String.fromCharCode(64 + classNum)}`,
//           capacity: STUDENTS_PER_CLASS,
//           gradeId: grade,
//         },
//       })
//     }
//   }

//   // Create Teachers
//   const teachers: Teacher[] = []
//   for (let i = 0; i < TEACHER_COUNT; i++) {
//     const teacher = await prisma.teacher.create({
//       data: {
//         id: `teacher${i + 1}`,
//         username: faker.internet.userName(),
//         name: faker.person.firstName(),
//         surname: faker.person.lastName(),
//         email: faker.internet.email(),
//         phone: faker.phone.number(),
//         adress: faker.location.streetAddress(),
//         bloodType: faker.helpers.arrayElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
//         sex: randomEnum(UserSex),
//       },
//     })
//     teachers.push(teacher)
//   }

//   // Create Subjects and assign to teachers
//   const subjects: (Subject & { teachers: Teacher[] })[] = []
//   const subjectNames = [
//     'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History',
//     'Geography', 'Literature', 'English', 'Computer Science', 'Art',
//     'Music', 'Physical Education', 'Economics', 'Psychology', 'Philosophy'
//   ]
//  // Shuffle the subject names array
// const shuffledSubjectNames = faker.helpers.shuffle(subjectNames).slice(0, SUBJECT_COUNT);

// for (let i = 0; i < SUBJECT_COUNT; i++) {
//   const subjectTeachers = faker.helpers.arrayElements(teachers, { min: 1, max: 3 });
//   const subjectName = shuffledSubjectNames[i]; // Now this will be unique

//   const subject = await prisma.subject.create({
//     data: {
//       name: subjectName, // No duplicates, as we're using shuffled unique names
//       teachers: {
//         connect: subjectTeachers.map(t => ({ id: t.id })),
//       },
//     },
//     include: {
//       teachers: true,
//     },
//   });
//   subjects.push(subject);
// }


//   // Create Parents and Students
//   const classes = await prisma.class.findMany()
//   for (const cls of classes) {
//     for (let i = 0; i < STUDENTS_PER_CLASS; i++) {
//       const parent = await prisma.parent.create({
//         data: {
//           id: faker.string.uuid(),
//           username: faker.internet.userName(),
//           name: faker.person.firstName(),
//           surname: faker.person.lastName(),
//           email: faker.internet.email(),
//           phone: faker.phone.number(),
//           adress: faker.location.streetAddress(),
//         },
//       })

//       await prisma.student.create({
//         data: {
//           id: faker.string.uuid(),
//           username: faker.internet.userName(),
//           name: faker.person.firstName(),
//           surname: faker.person.lastName(),
//           email: faker.internet.email(),
//           phone: faker.phone.number(),
//           adress: faker.location.streetAddress(),
//           bloodType: faker.helpers.arrayElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
//           sex: randomEnum(UserSex),
//           parentId: parent.id,
//           classId: cls.id,
//           gradeId: cls.gradeId,
//         },
//       })
//     }
//   }

//   // Create Lessons
//   const lessonNames = ['Math', 'Science', 'Literature', 'History', 'Physical Education', 'Art', 'Music']
//   for (const cls of classes) {
//     for (const subject of faker.helpers.arrayElements(subjects, { min: 5, max: 7 })) {
//       const teacher = faker.helpers.arrayElement(subject.teachers)
//       await prisma.lesson.create({
//         data: {
//           name: `${faker.helpers.arrayElement(lessonNames)} ${cls.name}`,
//           day: randomEnum(Day),
//           startTime: faker.date.future(),
//           endTime: faker.date.future(),
//           subjectId: subject.id,
//           classId: cls.id,
//           teacherId: teacher.id,
//         },
//       })
//     }
//   }

//   // Create Events and Announcements
//   for (const cls of classes) {
//     const eventCount = faker.number.int({ min: 2, max: 5 })
//     for (let i = 0; i < eventCount; i++) {
//       await prisma.event.create({
//         data: {
//           title: faker.lorem.sentence(),
//           description: faker.lorem.paragraph(),
//           startTime: faker.date.future(),
//           endTime: faker.date.future(),
//           classId: cls.id,
//         },
//       })
//     }

//     const announcementCount = faker.number.int({ min: 3, max: 7 })
//     for (let i = 0; i < announcementCount; i++) {
//       await prisma.announcement.create({
//         data: {
//           title: faker.lorem.sentence(),
//           description: faker.lorem.paragraph(),
//           date: faker.date.recent(),
//           classId: cls.id,
//         },
//       })
//     }
//   }

//   console.log('Seed data created successfully')
// }

// main()
//   .catch((e) => {
//     console.error(e)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })



const prisma = new PrismaClient();

const GRADE_COUNT = 6;
const CLASS_PER_GRADE = 3;
const STUDENTS_PER_CLASS = 20;
const TEACHER_COUNT = 20;
const SUBJECT_COUNT = 10;

async function main() {
  function randomEnum<T extends object>(anEnum: T): T[keyof T] {
    const enumValues = Object.values(anEnum);
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    return enumValues[randomIndex] as T[keyof T];
  }

  // Create Admin accounts
  const adminCount = 3;
  for (let i = 0; i < adminCount; i++) {
    await prisma.admin.create({
      data: {
        id: `admin${i + 1}`,
        username: faker.internet.userName(),
      },
    });
  }

  // Create Grades
  for (let i = 1; i <= GRADE_COUNT; i++) {
    await prisma.grade.create({
      data: { level: i },
    });
  }

  // Create Classes
  for (let grade = 1; grade <= GRADE_COUNT; grade++) {
    for (let classNum = 1; classNum <= CLASS_PER_GRADE; classNum++) {
      await prisma.class.create({
        data: {
          name: `${grade}-${String.fromCharCode(64 + classNum)}`,
          capacity: STUDENTS_PER_CLASS,
          gradeId: grade,
        },
      });
    }
  }

  // Create Teachers
  const teachers = [];
  for (let i = 0; i < TEACHER_COUNT; i++) {
    const teacher = await prisma.teacher.create({
      data: {
        id: `teacher${i + 1}`,
        username: faker.internet.userName(),
        name: faker.person.firstName(),
        surname: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        adress: faker.location.streetAddress(),
        bloodType: faker.helpers.arrayElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
        sex: randomEnum(UserSex),
      },
    });
    teachers.push(teacher);
  }

  // Create Subjects and assign to teachers
  const subjects: (Subject & { teachers: Teacher[] })[] = []
  const subjectNames = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History',
    'Geography', 'Literature', 'English', 'Computer Science', 'Art',
    'Music', 'Physical Education', 'Economics', 'Psychology', 'Philosophy'
  ]
 // Shuffle the subject names array
const shuffledSubjectNames = faker.helpers.shuffle(subjectNames).slice(0, SUBJECT_COUNT);

for (let i = 0; i < SUBJECT_COUNT; i++) {
  const subjectTeachers = faker.helpers.arrayElements(teachers, { min: 1, max: 3 });
  const subjectName = shuffledSubjectNames[i]; // Now this will be unique

  const subject = await prisma.subject.create({
    data: {
      name: subjectName, // No duplicates, as we're using shuffled unique names
      teachers: {
        connect: subjectTeachers.map(t => ({ id: t.id })),
      },
    },
    include: {
      teachers: true,
    },
  });
  subjects.push(subject);
}

  // Create Parents and Students
  const classes = await prisma.class.findMany();
  const students = [];

  for (const cls of classes) {
    for (let i = 0; i < STUDENTS_PER_CLASS; i++) {
      const parent = await prisma.parent.create({
        data: {
          id: faker.string.uuid(),
          username: faker.internet.userName(),
          name: faker.person.firstName(),
          surname: faker.person.lastName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          adress: faker.location.streetAddress(),
        },
      });

      const student = await prisma.student.create({
        data: {
          id: faker.string.uuid(),
          username: faker.internet.userName(),
          name: faker.person.firstName(),
          surname: faker.person.lastName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          adress: faker.location.streetAddress(),
          bloodType: faker.helpers.arrayElement(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
          sex: randomEnum(UserSex),
          parentId: parent.id,
          classId: cls.id,
          gradeId: cls.gradeId,
        },
      });
      students.push(student);
    }
  }

  // Create Lessons
  for (const cls of classes) {
    for (const subject of faker.helpers.arrayElements(subjects, { min: 5, max: 7 })) {
      const teacher = faker.helpers.arrayElement(subject.teachers);
      await prisma.lesson.create({
        data: {
          name: `${subject.name} Lesson for ${cls.name}`,
          day: randomEnum(Day),
          startTime: faker.date.future(),
          endTime: faker.date.future(),
          subjectId: subject.id,
          classId: cls.id,
          teacherId: teacher.id,
        },
      });
    }
  }

  // Create Assignments
  for (const lesson of await prisma.lesson.findMany()) {
    const assignmentCount = faker.number.int({ min: 3, max: 5 });
    for (let i = 0; i < assignmentCount; i++) {
      await prisma.assigment.create({
        data: {
          title: faker.lorem.sentence(),
          startDate: faker.date.recent(),
          dueDate: faker.date.future(),
          lessonId: lesson.id,
        },
      });
    }
  }

  // Create Exams
  for (const lesson of await prisma.lesson.findMany()) {
    const examCount = faker.number.int({ min: 2, max: 4 });
    for (let i = 0; i < examCount; i++) {
      await prisma.exam.create({
        data: {
          title: faker.lorem.sentence(),
          startTime: faker.date.future(),
          endTime: faker.date.future(),
          lessonId: lesson.id,
        },
      });
    }
  }

  // Create Results (for both exams and assignments)
  for (const exam of await prisma.exam.findMany()) {
    const examStudents = faker.helpers.arrayElements(students, { min: 10, max: 20 });
    for (const student of examStudents) {
      await prisma.result.create({
        data: {
          score: faker.number.int({ min: 50, max: 100 }),
          examId: exam.id,
          studentId: student.id,
        },
      });
    }
  }

  for (const assignment of await prisma.assigment.findMany()) {
    const assignmentStudents = faker.helpers.arrayElements(students, { min: 10, max: 20 });
    for (const student of assignmentStudents) {
      await prisma.result.create({
        data: {
          score: faker.number.int({ min: 50, max: 100 }),
          assigmentId: assignment.id,
          studentId: student.id,
        },
      });
    }
  }

  // Create Attendance Records
  for (const student of students) {
    for (const lesson of await prisma.lesson.findMany()) {
      await prisma.attendance.create({
        data: {
          date: faker.date.recent(),
          present: faker.helpers.arrayElement([true, false]),
          studentId: student.id,
          lessonId: lesson.id,
        },
      });
    }
  }

  // Create Events and Announcements
  for (const cls of classes) {
    const eventCount = faker.number.int({ min: 2, max: 5 });
    for (let i = 0; i < eventCount; i++) {
      await prisma.event.create({
        data: {
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          startTime: faker.date.future(),
          endTime: faker.date.future(),
          classId: cls.id,
        },
      });
    }

    const announcementCount = faker.number.int({ min: 3, max: 7 });
    for (let i = 0; i < announcementCount; i++) {
      await prisma.announcement.create({
        data: {
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraph(),
          date: faker.date.recent(),
          classId: cls.id,
        },
      });
    }
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
