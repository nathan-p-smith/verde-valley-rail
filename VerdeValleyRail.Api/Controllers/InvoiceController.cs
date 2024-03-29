﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VerdeValleyRail.Api.Attributes;
using VerdeValleyRail.Business.Resources;
using VerdeValleyRail.Business.Services;

namespace VerdeValleyRail.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : AuthorizedControllerBase
    {
        IInvoiceService _invoiceService;

        public InvoiceController(IInvoiceService invoiceService)
        {
            _invoiceService = invoiceService;
        }

        [HttpPost("Preview")]
        [Authorize]
        public IActionResult Preview([FromBody] IEnumerable<BookingCreate> bookingCreates)
        {
            var invoice = _invoiceService.CreateInvoice(bookingCreates);

            return Ok(invoice);
        }

        [HttpPost("Pay")]
        [Authorize]
        public IActionResult Pay([FromBody] Invoice invoice)
        {
            int? customerId = base.GetCustomerId();

            invoice.CustomerId = (int)customerId;

            if (_invoiceService.PayInvoice(invoice))
                return Ok(invoice);

            return Ok(invoice);
        }
    }
}
