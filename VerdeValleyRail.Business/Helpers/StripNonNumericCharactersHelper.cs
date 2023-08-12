using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VerdeValleyRail.Business.Helpers
{
    public static class StripNonNumericCharactersHelper
    {
        public static string StripNonNumeric(this string? input)
        {
            if (input == null)
                return null;

            return new string(input.Where(c => char.IsDigit(c)).ToArray());
        }
    }
}
