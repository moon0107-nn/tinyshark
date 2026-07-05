using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using TinyShark.Data;
using TinyShark.Models;
namespace TinyShark.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly TinySharkContext _context;

        public HomeController(ILogger<HomeController> logger, TinySharkContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<IActionResult> Index()
        {
            var transactions = await _context.Transaction.ToListAsync();

            ViewBag.TotalThu = transactions
                .Where(t => t.Type == "Thu nhập")
                .Sum(t => t.Amount);

            ViewBag.TotalChi = transactions
                .Where(t => t.Type == "Chi tiêu")
                .Sum(t => t.Amount);

            ViewBag.TotalSave = transactions
                .Where(t => t.Type == "Tiết kiệm")
                .Sum(t => t.Amount);

            ViewBag.TotalCount = transactions.Count;

            ViewBag.RecentTransactions = transactions
                .OrderByDescending(t => t.Date)
                .Take(5)
                .ToList();

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
