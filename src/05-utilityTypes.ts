import { friends, colleagues } from "./01-basics";
import {
  Friend,
  Colleague,
  SecureFriendContact,
  FriendPartial,
  EventPass,
} from "./myTypes";



function updateFriend(friend: Friend, updates: FriendPartial): Friend {
  return { ...friend, ...updates };
}

console.log(
  updateFriend(friends[0], {
    phone: "08712345",
    dob: new Date("1998-10-22"),
  })
);

function secureFindFriends(
  friends: Friend[],
  criteria: (f: Friend) => boolean
): SecureFriendContact[] {
  const matches = friends.filter(criteria);
  return matches.map((f) => ({
    name: f.name,
    phone: f.phone,
  }));
}


let result = secureFindFriends(friends, (f) => f.age < 30);
console.log(result);





function generateEventPass(colleague: Colleague): EventPass {
  const passCode = Math.round(Math.random() * (1000 - 1) + 1);
  return {
    name: colleague.name,
    department: colleague.department,
    passCode: passCode,
  };
}

console.log(generateEventPass(colleagues.current[0]));


type FriendColleagueIntersection =
  Pick<Friend, "name" | "age"> &
  Pick<Colleague, "contact">;

function intersection(
  friends: Friend[],
  colleagues: Colleague[]
): FriendColleagueIntersection[] {
  let result: FriendColleagueIntersection[] = [];

  friends.reduce((res, friend) => {
    const colleague = colleagues.find(
      (col) => col.name === friend.name
    );

    if (colleague) {
      res.push({
        name: friend.name,
        age: friend.age,
        contact: colleague.contact,
      });
    }
    return res;
  }, result);

  return result;
}

console.log(intersection(friends, colleagues.current));
