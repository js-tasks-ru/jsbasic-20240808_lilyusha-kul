function showSalary(users, age) {

      let filterred = users.filter(user => user.age <= age);
      let mapped = filterred.map(user => user.name + ", " + user.balance);
      let joined = mapped.join('\n');
        
        return joined;
    }
