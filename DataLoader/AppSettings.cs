using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLoader
{
    public class AppSettings
    {        
        public Connectionstrings ConnectionStrings { get; set; }     
    }

    public class Connectionstrings
    {
        public string VerdeValleyRail { get; set; }
    }
}
