using DinkToPdf.Contracts;
using DinkToPdf;

namespace AVEGIC.Services
{
    public class PdfService
    {
        private readonly IConverter _converter;

        public PdfService(IConverter converter)
        {
            _converter = converter;
        }

        public byte[] GeneratePdf(string htmlContent)
        {
            var doc = new HtmlToPdfDocument()
            {
                GlobalSettings = new GlobalSettings
                {
                    PaperSize = PaperKind.A4,
                    Orientation = Orientation.Portrait,
                    Margins = new MarginSettings { Top = 10, Bottom = 10, Left = 10, Right = 10 },
                    DocumentTitle = "",
                },
                Objects = {
                new ObjectSettings
                {
                    HtmlContent = htmlContent,
                    PagesCount = true,
                WebSettings = new WebSettings
            {
                DefaultEncoding = "utf-8",
                UserStyleSheet = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/css/pdf-styles.css") // Optional custom CSS
            },

                }
            }
            };
            return _converter.Convert(doc);
        }
    }
}
