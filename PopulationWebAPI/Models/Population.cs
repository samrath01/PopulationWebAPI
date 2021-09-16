using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PopulationWebAPI.Models
{
    public class Population
    {
        public int Id { get; set; }

        public string CountryName { get; set; }

        public int TotalPopulation { get; set; }

        public float GrowthRate { get; set; }

        public int Area { get; set; }
    }
}
