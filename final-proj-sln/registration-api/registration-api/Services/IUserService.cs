using System.Threading.Tasks;

namespace registration_api.Services
{
    public interface IUserService
    {
        Task<bool> Register(UserDto userDto);
        Task<UserDto?> Login(UserDto userDto);
    }
}
