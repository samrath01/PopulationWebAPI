using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PopulationWebAPI.Data;
using PopulationWebAPI.Models;

namespace PopulationWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PopulationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PopulationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Populations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Population>>> GetPopulations()
        {
            return await _context.Populations.ToListAsync();
        }

        // GET: api/Populations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Population>> GetPopulation(int id)
        {
            var population = await _context.Populations.FindAsync(id);

            if (population == null)
            {
                return NotFound();
            }

            return population;
        }

        // PUT: api/Populations/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPopulation(int id, Population population)
        {
            if (id != population.Id)
            {
                return BadRequest();
            }

            _context.Entry(population).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PopulationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Populations
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Population>> PostPopulation(Population population)
        {
            _context.Populations.Add(population);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPopulation", new { id = population.Id }, population);
        }

        // DELETE: api/Populations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Population>> DeletePopulation(int id)
        {
            var population = await _context.Populations.FindAsync(id);
            if (population == null)
            {
                return NotFound();
            }

            _context.Populations.Remove(population);
            await _context.SaveChangesAsync();

            return population;
        }

        private bool PopulationExists(int id)
        {
            return _context.Populations.Any(e => e.Id == id);
        }
    }
}
