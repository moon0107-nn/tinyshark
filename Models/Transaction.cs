using System.ComponentModel.DataAnnotations;
namespace TinyShark.Models
{
    public class Transaction
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập số tiền")]
        [Display(Name = "Số tiền")]
        public decimal Amount { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập mô tả")]
        [Display(Name = "Mô tả giao dịch")]
        public string Description { get; set; }

        [Display(Name = "Ngày giao dịch")]
        public DateTime Date { get; set; } = DateTime.Now;

        [Required(ErrorMessage = "Vui lòng chọn loại giao dịch")]
        [Display(Name = "Loại giao dịch (Thu/Chi)")]
        public string? Type { get; set; } // Ví dụ: "Thu nhập" hoặc "Chi tiêu"
    }
}
