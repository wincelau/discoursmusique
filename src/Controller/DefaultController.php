<?php
// src/AppBundle/Controller/DefaultController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;


class DefaultController extends Controller
{
    /**
     * @Route("/")
     */
    public function indexAction(Request $request)
    {
      $listeMusiques = $this->arrayFromCsvPath('../data/musiques.csv');
      $listeDiscours = $this->arrayFromCsvPath('../data/discours.csv');

      $discoursIds = array_keys($listeDiscours);
      $discoursId = $discoursIds[array_rand($discoursIds)];

      $musiqueIds = array_keys($listeMusiques);
      $musiqueId = $musiqueIds[array_rand($musiqueIds)];

      return $this->redirectToRoute('lecture', array('musiqueId' => $musiqueId,'discoursId' => $discoursId));

    }

    /**
     * @Route("/lecture/{musiqueId}/{discoursId}")
     */
    public function lectureAction(Request $request, $musiqueId , $discoursId)
    {
        $listeMusiques = $this->arrayFromCsvPath('../data/musiques.csv');
        $listeDiscours = $this->arrayFromCsvPath('../data/discours.csv');

        return $this->render('default/index.html.twig', [
            'listeMusiques' => $listeMusiques,
            'listeDiscours' => $listeDiscours,
            'musiqueId' => $musiqueId,
            'discoursId' => $discoursId
        ]);
    }

    /**
     * @Route("/apropos")
     */
    public function aProposAction(Request $request) {
      return $this->render('default/apropos.html.twig', []);
    }

    private function arrayFromCsvPath($path){
        $csvContent = file($path);
        $liste = array();
        foreach ($csvContent as $line_num => $row) {
            $csv = str_getcsv($row,';');
            $id = $csv[0];
            $liste[$id] = $csv;
        }
        return $liste;
    }
}
