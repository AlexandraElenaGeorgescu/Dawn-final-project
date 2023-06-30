using MongoDB.Driver;
using registration_api.Settings;
using System.Threading.Tasks;

namespace registration_api.Services
{
    public class UserService : IUserService
    {
        private readonly IMongoCollection<UserDto> _users;
        public UserService(IMongoDBSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _users = database.GetCollection<UserDto>(settings.CollectionName);
        }

        public async Task<bool> Register(UserDto userDto)
        {
            var filter = Builders<UserDto>.Filter.And(
            Builders<UserDto>.Filter.Eq(u => u.Email, userDto.Email),
            Builders<UserDto>.Filter.Eq(u => u.Password, userDto.Password)
        );

            var user = await _users.Find(filter).FirstOrDefaultAsync();

            if (user != null)
            {
                return false; // Registration failed
            }
            else { 

                userDto.Id = Guid.NewGuid();
                await _users.InsertOneAsync(userDto);
                return true;
                 
            }
        }

        public async Task<UserDto?> Login(UserDto userDto)
        {
            var filter = Builders<UserDto>.Filter.And(
                Builders<UserDto>.Filter.Eq(u => u.Email, userDto.Email),
                Builders<UserDto>.Filter.Eq(u => u.Password, userDto.Password)
            );

            var user = await _users.Find(filter).FirstOrDefaultAsync();
            if(user != null)
            {
                return user;

            }
            return null;
        }

    }
}
